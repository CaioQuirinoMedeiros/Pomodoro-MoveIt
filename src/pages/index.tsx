import Head from 'next/head'

import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import styles from '../styles/pages/home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | MoveIt</title>
      </Head>
      <ExperienceBar />
      <section>
        <div className=''>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  )
}
