import Modal from 'components/Modal'
import modalStyles from 'components/Modal/Modal.module.scss'
import Image from 'next/image'
import { useCallback } from 'react'
import { Connector, InjectedConnector, useConnect } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import styles from './ConnectorModal.module.scss'

interface ConnectorModalProps {
  close: () => void
}

function ConnectorImage({ connector }: { connector: Connector<any, any> }) {
  let src = ''
  let alt = ''
  if (connector instanceof InjectedConnector) {
    src = '/metamaskIcon.png'
    alt = 'MetaMask icon'
  } else if (connector instanceof WalletConnectConnector) {
    src = '/walletConnectIcon.svg'
    alt = 'WalletConnect icon'
  } else if (connector instanceof WalletLinkConnector) {
    src = '/coinbaseWalletIcon.svg'
    alt = 'Coinbase Wallet icon'
  }
  return <Image src={src} alt={alt} width={24} height={24} />
}

export default function ConnectorModal({ close }: ConnectorModalProps) {
  const [{ data, error }, connect] = useConnect()

  const handleConnect = useCallback(
    (connector: Connector<any, any>) => {
      connect(connector)
      close()
    },
    [close, connect]
  )
  return (
    <Modal close={close}>
      <div className={modalStyles.content} id={styles.content} onClick={(e) => e.stopPropagation()}>
        {data.connectors.map((connector) => (
          <button
            className={styles.connectorRow}
            onClick={() => handleConnect(connector)}
            key={connector.id}
            disabled={!connector.ready}
          >
            <div>{connector.name}</div>
            <ConnectorImage connector={connector} />
          </button>
        ))}
        {error && <div className={styles.error}>{error?.message ?? 'Failed to connect'}</div>}
      </div>
    </Modal>
  )
}
