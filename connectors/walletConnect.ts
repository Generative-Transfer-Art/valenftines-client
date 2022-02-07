import { initializeConnector } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect'

import { URLS } from '../chains'

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce<{ [chainId: number]: string }>((accumulator, chainId) => {
        const id = Number(chainId)
        accumulator[id] = URLS[id][0]
        return accumulator
      }, {}),
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
)
