import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(120)
  const [active, setActive] = useState(false)

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
    if (active && time > 0) {
      setTimeout(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }
  }, [active, time])

  const startCountdown = useCallback(() => {
    setActive(true)
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

      <button
        type='button'
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Start!
      </button>
    </>
  )
}
