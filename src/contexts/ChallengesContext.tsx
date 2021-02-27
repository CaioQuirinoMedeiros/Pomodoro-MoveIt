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
}

interface ChallengesProviderProps {
  children: React.ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

const getLevel = (experience: number) => {
  let level = 1
  let experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  while (experience > experienceToNextLevel) {
    level = level + 1
    experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    console.log({ level, experienceToNextLevel })
  }

  return { level, experienceToNextLevel }
}

const getNextLevelExperience = (level: number) => {
  return Math.pow((level + 1) * 4, 2)
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [currentExperience, setCurrentExperience] = useState(3138)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const level = useMemo(() => {
    let level = 1
    let experienceToNextLevel = getNextLevelExperience(level)
    while (currentExperience > experienceToNextLevel) {
      level = level + 1
      experienceToNextLevel = getNextLevelExperience(level)
    }

    return level
  }, [currentExperience])

  const levelUp = useCallback(() => {}, [])

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }, [])

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null)
  }, [])

  return (
    <ChallengesContext.Provider
      value={{
        level: level,
        currentExperience,
        nextLevelExperience: getNextLevelExperience(level),
        lastLevelExperience: getNextLevelExperience(level - 1),
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export const useChallenges = () => {
  return useContext(ChallengesContext)
}
