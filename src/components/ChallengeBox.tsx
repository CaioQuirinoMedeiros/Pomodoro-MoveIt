import React, { useCallback } from 'react'
import { useChallenges } from '../contexts/ChallengesContext'
import { useCountdown } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenges()
  const { resetCountdown } = useCountdown()

  const handleChallengeFailed = useCallback(() => {
    resetChallenge()
    resetCountdown()
  }, [resetChallenge, resetCountdown])

  const handleChallengeSucceeded = useCallback(() => {
    completeChallenge()
    resetCountdown()
  }, [completeChallenge, resetCountdown])

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
              onClick={handleChallengeFailed}
            >
              Failed
            </button>
            <button
              type='button'
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Done!
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
