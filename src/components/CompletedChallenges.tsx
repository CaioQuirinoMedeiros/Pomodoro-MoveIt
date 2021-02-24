import React from 'react'

import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed challenges</span>
      <span>5</span>
    </div>
  )
}
