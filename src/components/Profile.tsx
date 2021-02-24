import React from 'react'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src='https://avatars.githubusercontent.com/u/48543208?s=460&u=f056bca652dc7e1619b6e275ac220a4b91a0cf88&v=4'
        alt='Caio Medeiros'
      />
      <div>
        <strong>Caio Medeiros</strong>
        <p>
          <img src='icons/level.svg' alt='level' />
          Level 1
        </p>
      </div>
    </div>
  )
}
