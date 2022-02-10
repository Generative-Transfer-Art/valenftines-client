import { AddressHeart, SelectMessageHeart, SendToHeart } from 'components/Heart'
import Layout from 'components/Layout'
import MintControls from 'components/MintControls'
import SendTo from 'components/SendTo'
import { atom } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from 'styles/Mint.module.scss'

export enum PAGE_STATE {
  READY,
  PENDING,
  COMPLETE,
}

export interface MintState {
  recipient: string
  id1: number
  id2: number
  id3: number
}

export const mintAtom = atom<MintState>({
  recipient: '',
  id1: 1,
  id2: 2,
  id3: 3,
})

export default function Mint() {
  const [addressGetterOpen, setAddressGetterOpen] = useState(false)
  const [pageState, setPageState] = useState(PAGE_STATE.READY)

  const layoutMainClasses = useMemo(() => {
    switch (pageState) {
      case PAGE_STATE.READY:
        return styles.main
      case PAGE_STATE.PENDING:
        return `${styles.main} ${styles.pendingLayout}`
      case PAGE_STATE.COMPLETE:
        return `${styles.main} ${styles.completeLayout}`
    }
  }, [pageState])

  return (
    <Layout mainClass={layoutMainClasses}>
      {addressGetterOpen && <SendTo close={() => setAddressGetterOpen(false)} />}
      <div className={styles.wrapper}>
        <p>
          Valenftines are messages, they can only be minted *to* another address. Select your favorite hearts, add the
          address of your friend/lover, mint, and the NFT will appear in their wallet.
        </p>
        <div className={styles.heartsWrapper}>
          <div className={styles.sendFromHeart}>
            <AddressHeart address={'0x00'} />
          </div>
          <div className={styles.sendToHeart}>
            <SendToHeart onClick={() => setAddressGetterOpen(true)} />
          </div>
          <div className={styles.heart1}>
            <SelectMessageHeart />
          </div>
          <div className={styles.heart2}>
            <SelectMessageHeart />
          </div>
          <div className={styles.heart3}>
            <SelectMessageHeart />
          </div>
        </div>
        <MintControls setPageState={setPageState} pageState={pageState} />
        <p>
          Valenftines are transfer art, and they change when they move between wallets. If your recipient sends this NFT
          back to you, it will upgrade from UNREQUITED to REQUITED and clone itself so you’ll both have a copy!
        </p>
        <p>
          If your recipient does nothing, the UNREQUITED Valenftine will simply sit in their wallet, a token of your
          affection.
        </p>
        <p>
          If they send it to someone else (ouch!) the FROM address will switch from yours to theirs, and the TO address
          will switch from theirs to the new recipient.
        </p>
        <p>
          For more details, follow the project on{' '}
          <Link href="https://twitter.com/valenftinesday">
            <a className={styles.link}>Twitter</a>
          </Link>
          .
        </p>
      </div>
    </Layout>
  )
}
