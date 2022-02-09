import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Network } from '@web3-react/network'
import usePriorityConnectorHooks from 'hooks/usePriorityConnectorHooks'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ALL_SUPPORTED_CHAIN_IDS } from 'types'

import ConnectorModal from '../ConnectorModal'
import styles from './ConnectButton.module.scss'

export default function ConnectButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const hooks = usePriorityConnectorHooks()
  const isActive = hooks.usePriorityIsActive()
  const isActivating = hooks.usePriorityIsActivating()
  const chainId = hooks.usePriorityChainId()
  const connector = hooks.usePriorityConnector()

  const toggleConnectionModal = useCallback(() => setOpen(!open), [open])

  useEffect(() => {
    if (isActive && chainId === 1 && !(connector instanceof Network)) {
      router.push('/mint')
    }
  }, [connector, chainId, isActive, router])

  const wrongChain = useMemo(() => chainId && !ALL_SUPPORTED_CHAIN_IDS.includes(chainId), [chainId])
  const switchToMainnet = useCallback(() => {
    if (connector.provider) {
      const formattedChainId = hexStripZeros(BigNumber.from(1).toHexString())
      connector.provider
        ?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: formattedChainId }] })
        .then(console.log)
        .catch(console.error)
    }
  }, [connector])
  if (wrongChain) {
    return (
      <button className={styles.button} onClick={switchToMainnet}>
        SWITCH TO ETH MAINNET
      </button>
    )
  }

  return (
    <>
      {open && <ConnectorModal close={toggleConnectionModal} />}
      <button className={styles.button} onClick={toggleConnectionModal} disabled={isActivating}>
        {isActivating ? 'ACTIVATING...' : 'CONNECT WALLET'}
      </button>
    </>
  )
}
