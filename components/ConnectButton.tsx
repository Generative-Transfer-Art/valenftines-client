import usePriorityConnectorHooks from 'hooks/usePriorityConnectorHooks'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import styles from '../styles/ConnectButton.module.scss'
import ConnectorModal from './ConnectorModal'

export default function ConnectButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const hooks = usePriorityConnectorHooks()
  const isActive = hooks.usePriorityIsActive()
  const isActivating = hooks.usePriorityIsActivating()

  const toggleConnectionModal = useCallback(() => setOpen(!open), [open])

  if (isActive) {
    return router.push('/app')
  }
  if (isActivating) {
    return (
      <button className={styles.button} disabled>
        ACTIVATING...
      </button>
    )
  }
  return (
    <>
      {open && <ConnectorModal close={toggleConnectionModal} />}
      <button className={styles.button} onClick={toggleConnectionModal}>
        CONNECT WALLET
      </button>
    </>
  )
}
