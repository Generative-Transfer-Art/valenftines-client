import Head from 'next/head'
import { PropsWithChildren } from 'react'
import { chain, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import styles from './Layout.module.scss'

interface LayoutProps {
  mainClass?: string
}

const infuraId = process.env.INFURA_ID

// Chains for connectors to support
const chains = [chain.mainnet, chain.rinkeby]

// Set up connectors
const connectors = ({ chainId }: { chainId?: number | undefined }) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        rpc: {
          [chain.mainnet.id]: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
          [chain.rinkeby.id]: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        },
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Valenftines',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

export default function Layout({ children, mainClass }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Head>
        <title>Valenftines</title>
        <meta name="description" content="A transfer art project" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Provider autoConnect connectors={connectors}>
        <main className={`${styles.wrapper} ${mainClass}`}>{children}</main>
      </Provider>
    </>
  )
}
