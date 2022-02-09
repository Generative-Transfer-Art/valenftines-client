import { BigNumber } from '@ethersproject/bignumber'
import Layout from 'components/Layout'
import SendTo from 'components/SendTo'
import { useOnlySupportedNetworks } from 'hooks/useOnlySupportedNetworks'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import styles from 'styles/Mint.module.scss'

export default function Mint() {
  useOnlySupportedNetworks()
  const [addressGetterOpen, setAddressGetterOpen] = useState(false)
  const [mintEthPrice, setMintEthPrice] = useState<BigNumber>(BigNumber.from(0))
  const [recipient, setRecipient] = useState<string>('')
  const [msg1, setMsg1] = useState<string>('')
  const [msg2, setMsg2] = useState<string>('')
  const [msg3, setMsg3] = useState<string>('')
  const readyToMint = useMemo(() => recipient && msg1 && msg2 && msg3, [recipient, msg1, msg2, msg3])

  const mint = useCallback(() => {
    console.log('mint')
  }, [])

  return (
    <Layout mainClass={styles.main}>
      {addressGetterOpen && <SendTo close={() => setAddressGetterOpen(false)} saveAddress={setRecipient} />}
      <div className={styles.wrapper}>
        <p>
          Valenftines are messages, they can only be minted *to* another address. Select your favorite hearts, add the
          address of your friend/lover, mint, and the NFT will appear in their wallet.
        </p>
        <svg></svg>
        <button className={styles.mintButton} disabled={!readyToMint} onClick={mint}>
          Mint {mintEthPrice.toString()} ETH
        </button>
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
