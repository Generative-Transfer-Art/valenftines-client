import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ALL_SUPPORTED_CHAIN_IDS } from 'types'
import { useAccount, useConnect, useNetwork } from 'wagmi'

import ConnectorModal from '../ConnectorModal'
import styles from './ConnectButton.module.scss'

export default function ConnectButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [{ loading }] = useAccount()
  const [
    {
      data: { connector },
    },
  ] = useConnect()
  const [{ data: network }] = useNetwork()

  useEffect(() => {
    if (!loading && network.chain?.id && ALL_SUPPORTED_CHAIN_IDS.includes(network.chain?.id)) {
      router.push('/mint')
    }
  }, [network.chain?.id, loading, router])

  const switchToMainnet = useCallback(() => {
    if (connector) {
      const provider = connector.getProvider()
      const formattedChainId = hexStripZeros(BigNumber.from(1).toHexString())
      provider
        ?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: formattedChainId }] })
        .then(console.log)
        .catch(console.error)
    }
  }, [connector])

  const wrongChain = useMemo(
    () => network.chain?.id && !ALL_SUPPORTED_CHAIN_IDS.includes(network.chain?.id),
    [network.chain?.id]
  )

  const handleButtonClick = useCallback(() => {
    if (wrongChain && !loading) {
      switchToMainnet()
    }
    if (!loading) {
      setOpen(!open)
    }
  }, [loading, open, switchToMainnet, wrongChain])

  return (
    <>
      {open && <ConnectorModal close={() => setOpen(!open)} />}
      <button className={styles.button} onClick={handleButtonClick} disabled={loading}>
        {loading ? 'LOADING...' : wrongChain ? 'SWITCH TO ETH MAINNET' : 'CONNECT WALLET'}
      </button>
    </>
  )
}
