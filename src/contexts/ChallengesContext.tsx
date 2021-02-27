import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import challenges from '../../challenges.json'

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
  levelUp(): void
  startNewChallenge(): void
  activeChallenge: Challenge
  resetChallenge(): void
  completeChallenge(): void
}

interface ChallengesProviderProps {
  children: React.ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

const getLevelExperience = (level: number) => {
  return Math.pow(level * 4, 2)
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [currentExperience, setCurrentExperience] = useState(
    getLevelExperience(1)
  )
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)

  const level = useMemo(() => {
    let level = 1
    let experienceToNextLevel = getLevelExperience(level + 1)
    while (currentExperience >= experienceToNextLevel) {
      level = level + 1
      experienceToNextLevel = getLevelExperience(level + 1)
    }

    return level
  }, [currentExperience])

  const levelUp = useCallback(() => {}, [])

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge as Challenge)
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
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export const useChallenges = () => {
  return useContext(ChallengesContext)
}
