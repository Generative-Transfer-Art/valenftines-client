import { parseEther } from '@ethersproject/units'
import { Valenftines } from 'abis/types'
import ValenftinesAbi from 'abis/Valenftines.json'
import { ContractTransaction } from 'ethers'
import { useAtomValue } from 'jotai/utils'
import { earlyMintProofForAddress, isEarlyMintEligble } from 'lib/earlyMint'
import { mintCostETH } from 'lib/mintCost'
import { isEarlyMint, isMintLive } from 'lib/mintTiming'
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
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  })
  const isEarlyMinter = useMemo(() => {
    return isEarlyMint() && accountData && isEarlyMintEligble(accountData.address)
  }, [accountData])

  const mintLive = useMemo(() => {
    return isMintLive()
  }, [])

  const mintState = useAtomValue(mintAtom)
  const [{ data: network }] = useNetwork()
  const [txHash, setTxHash] = useState<string | null>(null)
  const [valentineId, setValentineId] = useState('')

  const mintEthPrice = useMemo(() => {
    const { id1, id2, id3 } = mintState
    let cost = mintCostETH(id1) + mintCostETH(id2) + mintCostETH(id3)

    if (isEarlyMinter) {
      cost = (cost * 50) / 100
    }

    return cost.toString()
  }, [mintState, isEarlyMinter])

  const contractAddress = useMemo(
    () => VALENFTINES_ADDRESS[(network.chain?.id as SupportedChainId) || SupportedChainId.MAINNET],
    [network]
  )

  const [{ data: signer }] = useSigner()
  const valeNFTinesContract = useContract<Valenftines>({
    addressOrName: contractAddress,
    contractInterface: JSON.stringify(ValenftinesAbi),
    signerOrProvider: signer,
  })

  const readyToMint = useMemo(
    () => network.chain?.id && mintState.recipient && mintState.id1 && mintState.id2 && mintState.id3,
    [network, mintState]
  )
  const mint = useCallback(async () => {
    const { recipient, id1, id2, id3 } = mintState
    if (accountData?.address && network.chain?.id && recipient && id1 && id2 && id3 && valeNFTinesContract) {
      try {
        setPageState(PAGE_STATE.PENDING)
        let transaction: ContractTransaction
        if (isEarlyMinter) {
          transaction = await valeNFTinesContract.gtapMint(
            recipient,
            id1,
            id2,
            id3,
            earlyMintProofForAddress(accountData.address),
            {
              value: parseEther(mintEthPrice),
            }
          )
        } else {
          transaction = await valeNFTinesContract.mint(recipient, id1, id2, id3, {
            value: parseEther(mintEthPrice),
          })
        }
        setTxHash(transaction.hash)
        await transaction.wait()
        const filter = valeNFTinesContract.filters.Transfer(null, accountData.address)
        valeNFTinesContract.once(filter, (_from, _to, id) => setValentineId(id.toString()))
        setPageState(PAGE_STATE.COMPLETE)
      } catch (error) {
        setPageState(PAGE_STATE.ERROR)
        console.error(error)
      } finally {
        setTxHash(null)
      }
    }
  }, [accountData, isEarlyMinter, mintEthPrice, mintState, network, setPageState, valeNFTinesContract])

  const resetState = useCallback(() => {
    setPageState(PAGE_STATE.READY)
    setTxHash(null)
    setValentineId('')
  }, [setPageState, setTxHash])

  const etherscanLink = useMemo(
    () => `https://${network.chain?.id === SupportedChainId.RINKEBY ? 'rinkeby.' : ''}etherscan.io/tx/${txHash}`,
    [network, txHash]
  )

  const openseaLink = useMemo(
    () =>
      `https://${
        network.chain?.id === SupportedChainId.RINKEBY ? 'testnets.' : ''
      }opensea.io/assets/${contractAddress}/${valentineId}`,
    [network, contractAddress, valentineId]
  )

  return (
    <>
      {pageState === PAGE_STATE.READY && (
        <div>
          {mintLive || isEarlyMinter ? (
            <button className={styles.mintButton} disabled={!readyToMint} onClick={mint}>
              MINT {mintEthPrice.toString()} ETH
            </button>
          ) : (
            <button className={styles.mintButton} disabled={true}>
              {' '}
              mint not open yet{' '}
            </button>
          )}
        </div>
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
