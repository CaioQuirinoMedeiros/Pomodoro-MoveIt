import React, { useMemo } from 'react'
import { useChallenges } from '../contexts/ChallengesContext'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const {
    currentExperience,
    lastLevelExperience,
    nextLevelExperience
  } = useChallenges()

  const percentageToNextLevel = useMemo(() => {
    return (
      (100 * (currentExperience - lastLevelExperience)) /
      (nextLevelExperience - lastLevelExperience)
    )
  }, [lastLevelExperience, nextLevelExperience, currentExperience])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentageToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentageToNextLevel}%` }}
        >
          {currentExperience - lastLevelExperience} xp
        </span>
      </div>
      <span>{nextLevelExperience - lastLevelExperience} xp</span>
    </header>
  )
}
