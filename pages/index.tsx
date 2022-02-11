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

const heartClasses = [styles.heart]
const ROW_1 = [
  ...BACKGROUND_HEARTS.map((Heart, i) => <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapROW_1${i}`} />),
  <Bullish4You classes={heartClasses} key="Bullish4You" />,
  <BeMine classes={heartClasses} key="BeMine" />,
  <ToTheMoon classes={heartClasses} key="ToTheMoon" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverse_1 = ${i}`} />
  )),
]

const ROW_2 = [
  ...BACKGROUND_HEARTS.map((Heart, i) => <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapROW_2${i}`} />),
  <MyDegen classes={heartClasses} key="MyDegen" />,
  <LooksRare classes={heartClasses} key="LooksRare" />,
  <UpOnly classes={heartClasses} key="UpOnly" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverseROW_2${i}`} />
  )),
]

const ROW_3 = [
  ...BACKGROUND_HEARTS.map((Heart, i) => <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapROW_3${i}`} />),
  <CallMe classes={heartClasses} key="CallMe" />,
  <PayMyTaxes classes={heartClasses} key="PayMyTaxes" />,
  <CutiePie classes={heartClasses} key="CutiePie" />,
  <Bullish4You classes={heartClasses} key="Bullish4You" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverseROW_3${i}`} />
  )),
]

const TITLE_ROW = [
  ...BACKGROUND_HEARTS.map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapTITLE_ROW${i}`} />
  )),
  <ForFriendsAndLovers classes={heartClasses} key="ForFriendsAndLovers" />,
  <ValeNFTines classes={heartClasses} key="ValeNFTines" />,
  <Feb14Only classes={heartClasses} key="Feb14Only" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverseTITLE_ROW${i}`} />
  )),
]

const ROW_4 = [
  ...BACKGROUND_HEARTS.map((Heart, i) => <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapROW_4${i}`} />),
  <CallMe classes={heartClasses} key="CallMe" />,
  <ZeroXZeroX classes={heartClasses} key="ZeroXZeroX" />,
  <Wagmi classes={heartClasses} key="Wagmi" />,
  <CallMe classes={heartClasses} key="CallMe" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverseROW_4${i}`} />
  )),
]

const ROW_5 = [
  ...BACKGROUND_HEARTS.map((Heart, i) => <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.mapROW_5${i}`} />),
  <LilMfer classes={heartClasses} key="LilMfer" />,
  <HodlMe classes={heartClasses} key="HodlMe" />,
  <CoolCat classes={heartClasses} key="CoolCat" />,
  ...BACKGROUND_HEARTS.reverse().map((Heart, i) => (
    <Heart classes={heartClasses} key={`heart-BACKGROUND_HEARTS.reverseROW_5 ${i}`} />
  )),
]

const ConnectButton = dynamic(() => import('components/ConnectButton'), { ssr: false })

const Home: NextPage = () => {
  return (
    <Layout mainClass={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.heartRow}>{ROW_1}</div>
          <div className={styles.heartRow}>{ROW_2}</div>
          <div className={styles.titleRow}>{TITLE_ROW}</div>
          <div className={styles.heartRow}>{ROW_3}</div>
        </div>
        <div className={styles.controlRow}>
          <ConnectButton />
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
