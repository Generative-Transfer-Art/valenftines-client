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
import { useContract, useNetwork } from 'wagmi'

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

  const mintEthPrice = useMemo(() => {
    const { id1, id2, id3 } = mintState
    const cost = mintCostETH(id1) + mintCostETH(id2) + mintCostETH(id3)
    return cost.toString()
  }, [mintState])

  const valeNFTinesContract = useContract<Valenftines>({
    addressOrName: '0x52270d8234b864dcAC9947f510CE9275A8a116Db',
    contractInterface: JSON.stringify(ValenftinesAbi),
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
        const receipt = await transaction.wait(1)
        console.log('success!', receipt)
      } catch (error) {
        console.error(error)
      } finally {
        setPageState(PAGE_STATE.COMPLETE)
        setTxHash(null)
      }
    }
  }, [chain, mintEthPrice, mintState, setPageState, valeNFTinesContract])

  const resetState = useCallback(() => {
    setPageState(PAGE_STATE.READY)
    setTxHash(null)
  }, [setPageState, setTxHash])
  const etherscanLink = `https://${chain?.id === SupportedChainId.RINKEBY ? 'rinkeby.' : ''}etherscan.com/tx/${txHash}`

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
          <Link href={`https://opensea.io`}>
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
