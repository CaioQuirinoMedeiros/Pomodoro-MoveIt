import React from 'react'
import { useChallenges } from '../contexts/ChallengesContext'

import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
  const { challengesCompleted } = useChallenges()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
