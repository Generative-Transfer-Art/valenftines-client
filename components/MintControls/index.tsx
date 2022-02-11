import { parseEther } from '@ethersproject/units'
import { Valenftines } from 'abis/types'
import ValenftinesAbi from 'abis/Valenftines.json'
import { useAtomValue } from 'jotai/utils'
import { mintCostETH } from 'lib/mintCost'
import Link from 'next/link'
import { mintAtom, PAGE_STATE } from 'pages/mint'
import { useCallback, useMemo, useState } from 'react'
import styles from 'styles/Mint.module.scss'
import { SupportedChainId } from 'types'
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi'

import { VALENFTINES_ADDRESS } from '../../constants'

interface MintControlsProps {
  pageState: PAGE_STATE
  setPageState: (p: PAGE_STATE) => void
}

export default function MintControls({ pageState, setPageState }: MintControlsProps) {
  const mintState = useAtomValue(mintAtom)
  const [
    {
      data: { chain },
    },
  ] = useNetwork()
  const [txHash, setTxHash] = useState<string | null>(null)
  const [valentineId, setValentineId] = useState('')

  const mintEthPrice = useMemo(() => {
    const { id1, id2, id3 } = mintState
    const cost = mintCostETH(id1) + mintCostETH(id2) + mintCostETH(id3)
    return cost.toString()
  }, [mintState])

  const contractAddress = useMemo(() => VALENFTINES_ADDRESS[chain?.id || SupportedChainId.MAINNET], [chain])
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()
  const valeNFTinesContract = useContract<Valenftines>({
    addressOrName: contractAddress,
    contractInterface: JSON.stringify(ValenftinesAbi),
    signerOrProvider: signer,
  })

  const readyToMint = useMemo(
    () => chain?.id && mintState.recipient && mintState.id1 && mintState.id2 && mintState.id3,
    [chain, mintState]
  )
  const mint = useCallback(async () => {
    const { recipient, id1, id2, id3 } = mintState
    if (chain?.id && recipient && id1 && id2 && id3 && valeNFTinesContract) {
      try {
        setPageState(PAGE_STATE.PENDING)
        const transaction = await valeNFTinesContract.mint(recipient, id1, id2, id3, {
          value: parseEther(mintEthPrice),
        })
        setTxHash(transaction.hash)
        await transaction.wait()
        const filter = valeNFTinesContract.filters.Transfer(null, account?.address)
        valeNFTinesContract.once(filter, (_from, _to, id) => setValentineId(id.toString()))
      } catch (error) {
        console.error(error)
      } finally {
        setPageState(PAGE_STATE.COMPLETE)
        setTxHash(null)
      }
    }
  }, [account, chain, mintEthPrice, mintState, setPageState, valeNFTinesContract])

  const resetState = useCallback(() => {
    setPageState(PAGE_STATE.READY)
    setTxHash(null)
    setValentineId('')
  }, [setPageState, setTxHash])

  const etherscanLink = useMemo(
    () => `https://${chain?.id === SupportedChainId.RINKEBY ? 'rinkeby.' : ''}etherscan.io/tx/${txHash}`,
    [chain, txHash]
  )

  const openseaLink = useMemo(
    () =>
      `https://${
        chain?.id === SupportedChainId.RINKEBY ? 'testnets.' : ''
      }opensea.io/assets/${contractAddress}/${valentineId}`,
    [chain, contractAddress, valentineId]
  )

  return (
    <>
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
          <button className={styles.mintButton} onClick={resetState}>
            SEND ANOTHER
          </button>
          <Link href={openseaLink}>
            <a className={styles.blackButton}>VIEW ON OPENSEA</a>
          </Link>
          <Link href={etherscanLink}>
            <a className={styles.blackButton}>VIEW ON ETHERSCAN</a>
          </Link>
        </>
      )}
    </>
  )
}
