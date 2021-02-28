import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { useChallenges } from './ChallengesContext'

interface CountdownContextData {
  time: number
  isActive: boolean
  hasFinished: boolean
  startCountdown(): void
  resetCountdown(): void
}

interface CountdownProviderProps {
  children: React.ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

const timer = 1500

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useChallenges()

  const [time, setTime] = useState(timer)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (hasFinished) return

    if (isActive && time > 0) {
      timeoutRef.current = setTimeout(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time, hasFinished])

  const startCountdown = useCallback(() => {
    setIsActive(true)
  }, [])

  const resetCountdown = useCallback(() => {
    setIsActive(false)
    setTime(timer)
    setHasFinished(false)
    clearTimeout(timeoutRef.current)
  }, [])

  return (
    <CountdownContext.Provider
      value={{
        time,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}

export const useCountdown = () => {
  return useContext(CountdownContext)
}
