import React from 'react'
import { useChallenges } from '../contexts/ChallengesContext'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useChallenges()

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Win {activeChallenge.amount} xp</header>
          <main>
            <img
              src={`icons/${activeChallenge.type}.svg`}
              alt={activeChallenge.type}
            />
            <strong>New challenge</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type='button'
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
              Failed
            </button>
            <button type='button' className={styles.challengeSucceededButton}>
              Got it!
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a round to receive a challenge</strong>
          <p>
            <img src='icons/level-up.svg' alt='Level up' />
            Level up by completing challenges
          </p>
        </div>
      )}
    </div>
  )
}
