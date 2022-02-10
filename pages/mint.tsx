import { parseEther } from '@ethersproject/units'
import { Network } from '@web3-react/network'
import { Valenftines } from 'abis/types'
import ValenftinesAbi from 'abis/Valenftines.json'
import { AddressHeart, SelectMessageHeart, SendToHeart, TextHeart } from 'components/Heart'
import HeartPicker from 'components/HeartPicker'
import Layout from 'components/Layout'
import { useContract } from 'hooks/useContract'
import { useOnlySupportedNetworks } from 'hooks/useOnlySupportedNetworks'
import usePriorityConnectorHooks from 'hooks/usePriorityConnectorHooks'
import { mintCostETH, mintCostWei } from 'lib/mintCost'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import styles from 'styles/Mint.module.scss'
import { SupportedChainId } from 'types'

import { VALENFTINES_ADDRESS } from '../constants'

enum PAGE_STATE {
  READY,
  PENDING,
  COMPLETE,
}

export default function Mint() {
  useOnlySupportedNetworks()  
  const [pageState, setPageState] = useState(PAGE_STATE.READY)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [recipient, setRecipient] = useState<string>('')
  const [id1, setId1] = useState<number>(0)
  const [id2, setId2] = useState<number>(0)
  const [id3, setId3] = useState<number>(0)

  const hooks = usePriorityConnectorHooks()
  const connector = hooks.usePriorityConnector()
  const chainId = hooks.usePriorityChainId()
  const readyToMint = useMemo(() => chainId && recipient && id1 && id2 && id3, [chainId, recipient, id1, id2, id3])

  const valeNFTinesContract = useContract<Valenftines>(
    VALENFTINES_ADDRESS[chainId as SupportedChainId],
    JSON.stringify(ValenftinesAbi)
  )

  const mintEthPrice : number = useMemo(() => {
    return mintCostETH(id1) + mintCostETH(id2) + mintCostETH(id3)
  }, [id1, id2, id3])

  const mint = useCallback(async () => {
    if (chainId && recipient && !(connector instanceof Network) && id1 && id2 && id3 && valeNFTinesContract) {
      try {
        setPageState(PAGE_STATE.PENDING)
        const transaction = await valeNFTinesContract.mint(recipient, id1, id2, id3, {
          value: parseEther(mintEthPrice.toString()),
        })
        setTxHash(transaction.hash)
        const receipt = await transaction.wait(1)
        console.log('success!', receipt)
      } catch (error) {
        console.error(error)
      } finally {
        setPageState(PAGE_STATE.COMPLETE)
        setTxHash(null)
      }
    }
  }, [chainId, connector, id1, id2, id3, mintEthPrice, recipient, valeNFTinesContract])

  const sendAnother = useCallback(() => {
    setPageState(PAGE_STATE.READY)
    setTxHash(null)
  }, [])


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

  const etherscanLink = `https://${chainId === SupportedChainId.RINKEBY ? 'rinkeby.' : ''}etherscan.com/tx/${txHash}`

  return (
    <Layout mainClass={layoutMainClasses}>
      <div className={styles.wrapper}>
        <p>
          Valenftines are messages, they can only be minted *to* another address. Select your favorite hearts, add the
          address of your friend/lover, mint, and the NFT will appear in their wallet.
        </p>

        <HeartPicker 
          heart1={id1}
          heart2={id2}
          heart3={id3}
          setToAddress={setRecipient}
          setHeart1={setId1}
          setHeart2={setId2}
          setHeart3={setId3}
        />

        {pageState === PAGE_STATE.READY && (
          <button className={styles.mintButton} disabled={!readyToMint} onClick={mint}>
            MINT {mintEthPrice.toString()} ETH
          </button>
        )}
        {pageState === PAGE_STATE.PENDING && (
          <>
            <button className={styles.blackButton}>PENDING...</button>
            <Link href={etherscanLink}>
              <a className={styles.blackButton}>VIEW ON ETHERSCAN</a>
            </Link>
          </>
        )}
        {pageState === PAGE_STATE.COMPLETE && (
          <>
            <button className={styles.mintButton} onClick={sendAnother}>
              SEND ANOTHER
            </button>
            <Link href={`https://opensea.io`}>
              <a className={styles.blackButton}>VIEW ON OPENSEA</a>
            </Link>
            <Link href={etherscanLink}>
              <a className={styles.blackButton}>VIEW ON ETHERSCAN</a>
            </Link>
          </>
        )}
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
