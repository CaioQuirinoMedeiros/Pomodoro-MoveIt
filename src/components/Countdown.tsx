import React, { useMemo } from 'react'
import { useCountdown } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    time,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown
  } = useCountdown()

  const minutesArray = useMemo(() => {
    return Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
      .split('')
  }, [time])

  const secondsArray = useMemo(() => {
    return (time % 60).toString().padStart(2, '0').split('')
  }, [time])

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesArray[0]}</span>
          <span>{minutesArray[1]}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsArray[0]}</span>
          <span>{secondsArray[1]}</span>
        </div>
      </div>

      {!!hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Finished
        </button>
      ) : (
        <>
          {!isActive ? (
            <button
              type='button'
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Start!
            </button>
          ) : (
            <button
              type='button'
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Stop
            </button>
          )}
        </>
      )}
    </>
  )
}
