import { parseEther } from '@ethersproject/units'
import { Valenftines } from 'abis/types'
import ValenftinesAbi from 'abis/Valenftines.json'
import Button from 'components/Button'
import { ContractTransaction } from 'ethers'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { earlyMintProofForAddress, isEarlyMintEligble } from 'lib/earlyMint'
import { mintCostETH } from 'lib/mintCost'
import { isEarlyMintLive, isPublicMintLive } from 'lib/mintTiming'
import { connectModalOpenAtom, mintAtom, PAGE_STATE } from 'pages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'types'
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi'

import { VALENFTINES_ADDRESS } from '../../constants'
import styles from './MintControls.module.scss'

interface MintControlsProps {
  pageState: PAGE_STATE
  setPageState: (p: PAGE_STATE) => void
}

export default function MintControls({ pageState, setPageState }: MintControlsProps) {
  const setConnectModalOpen = useUpdateAtom(connectModalOpenAtom)
  const [hasEarlyMinted, setHasEarlyMinted] = useState<boolean>()
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  })
  const isEarlyMinter = useMemo(() => accountData && isEarlyMintEligble(accountData.address), [accountData])
  const publicMintLive = useMemo(isPublicMintLive, [])
  const earlyMintLive = useMemo(isEarlyMintLive, [])

  const mintState = useAtomValue(mintAtom)
  const [{ data: network }] = useNetwork()
  const onSupportedNetwork = useMemo(
    () => network.chain?.id && ALL_SUPPORTED_CHAIN_IDS.includes(network.chain.id),
    [network]
  )
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

  const contractAddress = useMemo(() => {
    if (!onSupportedNetwork) {
      return VALENFTINES_ADDRESS[SupportedChainId.MAINNET]
    }
    return VALENFTINES_ADDRESS[network.chain?.id as SupportedChainId]
  }, [network.chain?.id, onSupportedNetwork])

  const [{ data: signer }] = useSigner()
  const valeNFTinesContract = useContract<Valenftines>({
    addressOrName: contractAddress,
    contractInterface: JSON.stringify(ValenftinesAbi),
    signerOrProvider: signer,
  })

  const checkEarlyMinted = useCallback(async () => {
    if (accountData == null || valeNFTinesContract == null || valeNFTinesContract.signer == null) {
      return
    }
    setHasEarlyMinted(await valeNFTinesContract.gtapEarlyMintClaimed(accountData.address))
  }, [accountData, valeNFTinesContract])

  useEffect(() => {
    checkEarlyMinted()
  }, [accountData, checkEarlyMinted, valeNFTinesContract])

  const readyToMint = useMemo(
    () =>
      network.chain?.id &&
      ALL_SUPPORTED_CHAIN_IDS.includes(network.chain.id as SupportedChainId) &&
      mintState.recipient &&
      mintState.id1 &&
      mintState.id2 &&
      mintState.id3 &&
      (publicMintLive || (isEarlyMinter && earlyMintLive)),
    [
      network.chain?.id,
      mintState.recipient,
      mintState.id1,
      mintState.id2,
      mintState.id3,
      publicMintLive,
      isEarlyMinter,
      earlyMintLive,
    ]
  )
  const mint = useCallback(async () => {
    if (!readyToMint) {
      return
    }
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
        const filter = valeNFTinesContract.filters.Transfer(null, recipient)
        const [log] = await valeNFTinesContract.queryFilter(filter, -1, 'latest')
        setValentineId(log.args.id.toString())
        setPageState(PAGE_STATE.COMPLETE)
      } catch (error) {
        setPageState(PAGE_STATE.COMPLETE)
        console.error(error)
      }
    }
  }, [accountData, isEarlyMinter, mintEthPrice, mintState, network, readyToMint, setPageState, valeNFTinesContract])

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

  const earlyMintComplete = useMemo(() => hasEarlyMinted && !publicMintLive, [hasEarlyMinted, publicMintLive])

  const buttonDisabled = useMemo(() => {
    if (!accountData) {
      return false
    }
    switch (pageState) {
      case PAGE_STATE.PENDING:
        return true
      case PAGE_STATE.COMPLETE:
      case PAGE_STATE.ERROR:
      case PAGE_STATE.READY:
        return earlyMintComplete || !readyToMint
    }
  }, [accountData, earlyMintComplete, pageState, readyToMint])

  const buttonText = useMemo(() => {
    if (!accountData) {
      return 'CONNECT WALLET'
    }
    switch (pageState) {
      case PAGE_STATE.COMPLETE:
        return 'SEND ANOTHER'
      case PAGE_STATE.ERROR:
        return 'RETRY'
      case PAGE_STATE.PENDING:
        return 'PENDING...'
      case PAGE_STATE.READY:
        if (earlyMintComplete) {
          return 'EARLY MINT CLAIMED!'
        }
        if (!publicMintLive) {
          if (!earlyMintLive && !isEarlyMintLive) {
            return 'MINT NOT OPEN YET'
          }
        }
        return `MINT ${mintEthPrice.toString()} ETH`
    }
  }, [accountData, earlyMintComplete, earlyMintLive, mintEthPrice, pageState, publicMintLive])

  const handleClick = useCallback(() => {
    if (!accountData) {
      return setConnectModalOpen(true)
    }
    switch (pageState) {
      case PAGE_STATE.COMPLETE:
      case PAGE_STATE.ERROR:
        return resetState()
      case PAGE_STATE.READY:
        return mint()
    }
  }, [accountData, mint, setConnectModalOpen, resetState, pageState])

  return (
    <>
      <Button disabled={buttonDisabled} onClick={handleClick} className={styles.button}>
        {buttonText}
      </Button>
      {pageState === PAGE_STATE.COMPLETE && (
        <Button href={openseaLink} as="externalLink" styleType="black" className={styles.button}>
          VIEW ON OPENSEA
        </Button>
      )}
      {[PAGE_STATE.PENDING, PAGE_STATE.COMPLETE].includes(pageState) && (
        <Button href={etherscanLink} as="externalLink" styleType="black" className={styles.button}>
          VIEW ON ETHERSCAN
        </Button>
      )}
    </>
  )
}
