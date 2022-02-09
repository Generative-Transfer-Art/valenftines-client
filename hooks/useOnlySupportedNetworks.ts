import { Network } from '@web3-react/network'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ALL_SUPPORTED_CHAIN_IDS } from 'types'

import usePriorityConnectorHooks from './usePriorityConnectorHooks'

export function useOnlySupportedNetworks() {
  const router = useRouter()
  const hooks = usePriorityConnectorHooks()
  const isActive = hooks.usePriorityIsActive()
  const chainId = hooks.usePriorityChainId()
  const connector = hooks.usePriorityConnector()

  useEffect(() => {
    if ((isActive && chainId && !ALL_SUPPORTED_CHAIN_IDS.includes(chainId)) || connector instanceof Network) {
      router.push('/')
    }
  }, [connector, chainId, isActive, router])
}
