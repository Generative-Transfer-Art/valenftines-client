import ConnectorModal from 'components/ConnectorModal'
import HeartPicker from 'components/HeartPicker'
import Layout from 'components/Layout'
import MintControls from 'components/MintControls'
import SendToModal from 'components/SendToModal'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from 'styles/Index.module.scss'

export enum PAGE_STATE {
  ERROR,
  READY,
  PENDING,
  COMPLETE,
  CONFIRM_MINT_TRANSACTION,
}

export interface MintState {
  recipient: string
  id1: number
  id2: number
  id3: number
}

export const connectModalOpenAtom = atom<boolean>(false)
export const INITIAL_MINT_STATE = {
  recipient: '',
  id1: 0,
  id2: 0,
  id3: 0,
}
export const mintAtom = atom<MintState>(INITIAL_MINT_STATE)

export default function Mint() {
  const [addressGetterOpen, setAddressGetterOpen] = useState(false)
  const [connectModalOpen, setConnectModalOpen] = useAtom(connectModalOpenAtom)
  const [pageState, setPageState] = useState(PAGE_STATE.READY)

  const layoutMainClasses = useMemo(() => {
    switch (pageState) {
      case PAGE_STATE.PENDING:
        return `${styles.main} ${styles.pendingLayout}`
      case PAGE_STATE.COMPLETE:
        return `${styles.main} ${styles.completeLayout}`
      case PAGE_STATE.READY:
      default:
        return styles.main
    }
  }, [pageState])

  return (
    <Layout mainClass={layoutMainClasses}>
      {addressGetterOpen && <SendToModal close={() => setAddressGetterOpen(false)} />}
      {connectModalOpen && <ConnectorModal close={() => setConnectModalOpen(false)} />}
      <div className={styles.wrapper}>
        <p>
          <Link href="https://twitter.com/valenftinesday" passHref>
            <a className={styles.headerLink} target="_blank">
              🐦 TWITTER
            </a>
          </Link>
          &nbsp;&nbsp;
          <Link href="https://opensea.io/collection/valenftines">
            <a className={styles.headerLink} target="_blank">
              🚢 OPENSEA
            </a>
          </Link>
        </p>
        <p>
          Valenftines are messages minted *from* one address *to* another address. Select your favorite hearts, add the
          address of your friend/lover, mint, and the NFT will appear in their wallet.
        </p>
        <div>
          <HeartPicker openAddressGetter={() => setAddressGetterOpen(true)} />
          <MintControls setPageState={setPageState} pageState={pageState} />
        </div>
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
            <a className={styles.link} target="_blank">
              Twitter
            </a>
          </Link>
          .
        </p>
      </div>
    </Layout>
  )
}
