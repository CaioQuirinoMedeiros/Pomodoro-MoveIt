import React from 'react'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const hasActiveChallenge = true

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Win 300 xp</header>
          <main>
            <img src='icons/body.svg' alt='Body' />
            <strong>New challenge</strong>
            <p>Get up and walk for 3 minutes</p>
          </main>

          <footer>
            <button type='button' className={styles.challengeFailedButton}>
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
