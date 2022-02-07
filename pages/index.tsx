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
import dynamic from 'next/dynamic'
import styles from 'styles/Home.module.scss'

const ROW_1 = [
  ...BACKGROUND_HEARTS,
  <Bullish4You key="Bullish4You" />,
  <BeMine key="BeMine" />,
  <ToTheMoon key="ToTheMoon" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const ROW_2 = [
  ...BACKGROUND_HEARTS,
  <MyDegen key="MyDegen" />,
  <LooksRare key="LooksRare" />,
  <UpOnly key="UpOnly" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const ROW_3 = [
  ...BACKGROUND_HEARTS,
  <CallMe key="CallMe" />,
  <PayMyTaxes key="PayMyTaxes" />,
  <CutiePie key="CutiePie" />,
  <Bullish4You key="Bullish4You" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const TITLE_ROW = [
  ...BACKGROUND_HEARTS,
  <ForFriendsAndLovers key="ForFriendsAndLovers" />,
  <ValeNFTines key="ValeNFTines" />,
  <Feb14Only key="Feb14Only" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const ROW_4 = [
  ...BACKGROUND_HEARTS,
  <CallMe key="CallMe" />,
  <ZeroXZeroX key="ZeroXZeroX" />,
  <Wagmi key="Wagmi" />,
  <CallMe key="CallMe" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const ROW_5 = [
  ...BACKGROUND_HEARTS,
  <LilMfer key="LilMfer" />,
  <HodlMe key="HodlMe" />,
  <CoolCat key="CoolCat" />,
  ...BACKGROUND_HEARTS.reverse(),
]

const ConnectButton = dynamic(() => import('components/ConnectButton'), { ssr: false })

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>{ROW_1}</div>
          <div className={styles.heartRow}>{ROW_2}</div>
          <div className={styles.titleRow}>{TITLE_ROW}</div>
          <div className={styles.heartRow}>{ROW_3}</div>
        </div>
        <div className={styles.controlRow}>
          <ConnectButton>CONNECT WALLET</ConnectButton>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>{ROW_4}</div>
          <div className={styles.heartRow}>{ROW_5}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
