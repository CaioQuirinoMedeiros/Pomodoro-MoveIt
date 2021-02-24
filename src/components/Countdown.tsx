import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from '../styles/components/Countdown.module.css'

interface CountdownProps {
  duration?: number
}

export function Countdown(props: CountdownProps) {
  const { duration = 3 } = props

  const [time, setTime] = useState(duration)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const minutesArray = useMemo(() => {
    return Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
      .split('')
  }, [time])

  const secondsArray = useMemo(() => {
    return (time % 60).toString().padStart(2, '0').split('')
  }, [time])

  useEffect(() => {
    if (hasFinished) return

    if (isActive && time > 0) {
      timeoutRef.current = setTimeout(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      console.log('Finalizou')
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time, hasFinished])

  const startCountdown = useCallback(() => {
    setIsActive(true)
  }, [])

  const resetCountdown = useCallback(() => {
    setIsActive(false)
    setTime(duration)
    clearTimeout(timeoutRef.current)
  }, [])

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
