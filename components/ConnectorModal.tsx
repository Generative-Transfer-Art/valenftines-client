import { metaMask } from 'connectors/metaMask'
import { walletConnect } from 'connectors/walletConnect'
import Image from 'next/image'
import { useCallback } from 'react'
import styles from 'styles/ConnectorModal.module.scss'

interface ConnectorModalProps {
  close: () => void
}

export default function ConnectorModal({ close }: ConnectorModalProps) {
  const connectMetamask = useCallback(() => metaMask.activate(1).then(close), [close])
  const connectWalletConnect = useCallback(() => walletConnect.activate(1).then(close), [close])

  return (
    <div className={styles.wrapper} onClick={close}>
      <div className={styles.innerWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>Connect a wallet</h2>
          <div onClick={close} className={styles.closeIcon}>
            💔
          </div>
        </div>
        <button className={styles.connectorRow} onClick={connectMetamask}>
          <div>MetaMask</div>
          <Image src="/metamaskIcon.png" alt="MetaMask icon" width={24} height={24} />
        </button>
        <button className={styles.connectorRow} onClick={connectWalletConnect}>
          <div>WalletConnect</div>
          <Image src="/walletConnectIcon.svg" alt="WalletConnect icon" width={24} height={24} />
        </button>
        {/* <button className={styles.connectorRow} onClick={() => connect()}>
          <div>Coinbase Wallet</div>
          <Image src="/coinbaseWalletIcon.svg" alt="Coinbase Wallet icon" width={24} height={24} />
        </button> */}
      </div>
    </div>
  )
}
