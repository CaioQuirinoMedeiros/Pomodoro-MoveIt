import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengesProvider } from '../contexts/ChallengesContext'
import { CountdownProvider } from '../contexts/CountdownContext'

import styles from '../styles/pages/home.module.css'

interface HomeProps {
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <CountdownProvider>
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
      </CountdownProvider>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.cookies
  const { currentExperience, challengesCompleted } = cookies
  return {
    props: {
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
