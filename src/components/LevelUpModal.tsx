import React from 'react'
import { useChallenges } from '../contexts/ChallengesContext'

import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallenges()

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Congratulations!</strong>
        <p>You reached a new level</p>

        <button type='button' onClick={closeLevelUpModal}>
          <img src='/icons/close.svg' alt='Close modal' />
        </button>
      </div>
    </div>
  )
}
