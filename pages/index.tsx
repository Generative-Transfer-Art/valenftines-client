import {
  BACKGROUND_HEARTS,
  BeMine,
  Bullish4You,
  CallMe,
  CoolCat,
  CutiePie,
  Feb14Only,
  ForFriendsAndLovers,
  HodlMe,
  LilMfer,
  LooksRare,
  MyDegen,
  PayMyTaxes,
  ToTheMoon,
  UpOnly,
  ValeNFTines,
  Wagmi,
  ZeroXZeroX,
} from 'components/Heart'
import Layout from 'components/Layout'
import type { NextPage } from 'next'
import { useCallback } from 'react'
import styles from 'styles/Home.module.scss'

const ROW_1 = [...BACKGROUND_HEARTS, Bullish4You, BeMine, ToTheMoon, ...BACKGROUND_HEARTS.reverse()]

const ROW_2 = [...BACKGROUND_HEARTS, MyDegen, LooksRare, UpOnly, ...BACKGROUND_HEARTS.reverse()]

const ROW_3 = [...BACKGROUND_HEARTS, CallMe, PayMyTaxes, CutiePie, Bullish4You, ...BACKGROUND_HEARTS.reverse()]

const TITLE_ROW = [...BACKGROUND_HEARTS, ForFriendsAndLovers, ValeNFTines, Feb14Only, ...BACKGROUND_HEARTS.reverse()]

const ROW_4 = [...BACKGROUND_HEARTS, CallMe, ZeroXZeroX, Wagmi, CallMe, ...BACKGROUND_HEARTS.reverse()]

const ROW_5 = [...BACKGROUND_HEARTS, LilMfer, HodlMe, CoolCat, ...BACKGROUND_HEARTS.reverse()]

const Home: NextPage = () => {
  const connectWallet = useCallback(() => {
    return {}
  }, [])
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>
            {ROW_1.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {ROW_2.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.titleRow}>
            {TITLE_ROW.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {ROW_3.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
        </div>
        <button className={styles.connectWallet} onClick={connectWallet}>
          CONNECT WALLET
        </button>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>
            {ROW_4.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
          <div className={styles.heartRow}>
            {ROW_5.map((El, j) => (
              <El key={`heart-${j}`} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
