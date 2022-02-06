import { BACKGROUND_HEARTS, Feb14Only, ForFriendsAndLovers, ValeNFTines } from 'components/Heart'
import Layout from 'components/Layout'
import type { NextPage } from 'next'
import { useCallback } from 'react'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  const connectWallet = useCallback(() => {
    return {}
  }, [])
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>
            {BACKGROUND_HEARTS.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {BACKGROUND_HEARTS.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.titleRow}>
            {[ForFriendsAndLovers, ValeNFTines, Feb14Only].map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {BACKGROUND_HEARTS.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
        </div>
        <button className={styles.connectWallet} onClick={connectWallet}>
          CONNECT WALLET
        </button>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>
            {BACKGROUND_HEARTS.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {BACKGROUND_HEARTS.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
