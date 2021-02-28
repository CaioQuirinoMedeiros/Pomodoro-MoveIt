import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  lastLevelExperience: number
  nextLevelExperience: number
  challengesCompleted: number
  startNewChallenge(): void
  activeChallenge: Challenge
  resetChallenge(): void
  completeChallenge(): void
  closeLevelUpModal(): void
}

interface ChallengesProviderProps {
  children: React.ReactNode
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

const getLevelExperience = (level: number) => {
  return Math.pow(level * 4, 2)
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function ChallengesProvider(props: ChallengesProviderProps) {
  const [currentExperience, setCurrentExperience] = useState(
    props.currentExperience || getLevelExperience(1)
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    props.challengesCompleted || 0
  )
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)
  const [isLevelUpModalOpen, setIsLevelUpModal] = useState(false)

  const level = useMemo(() => {
    let level = 1
    let experienceToNextLevel = getLevelExperience(level + 1)
    while (currentExperience >= experienceToNextLevel) {
      level = level + 1
      experienceToNextLevel = getLevelExperience(level + 1)
    }

    return level
  }, [currentExperience])

  const prevLevel = usePrevious(level)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    if (!!prevLevel && level > prevLevel) {
      setIsLevelUpModal(true)
    }
  }, [level, prevLevel])

  useEffect(() => {
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [currentExperience, challengesCompleted])

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge as Challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }, [])

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null)
  }, [])

  const completeChallenge = useCallback(() => {
    if (!activeChallenge) return

    const { amount } = activeChallenge
    setCurrentExperience((prevExperience) => prevExperience + amount)
    setChallengesCompleted((prevCompleted) => prevCompleted + 1)
    setActiveChallenge(null)
  }, [activeChallenge])

  return (
    <ChallengesContext.Provider
      value={{
        level: level,
        currentExperience,
        nextLevelExperience: getLevelExperience(level + 1),
        lastLevelExperience: getLevelExperience(level),
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal: () => {
          setIsLevelUpModal(false)
        }
      }}
    >
      {props.children}
      {!!isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export const useChallenges = () => {
  return useContext(ChallengesContext)
}
