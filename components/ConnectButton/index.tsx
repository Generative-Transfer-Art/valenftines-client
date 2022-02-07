import usePriorityConnectorHooks from 'hooks/usePriorityConnectorHooks'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import styles from '../ConnectButton.module.scss'
import ConnectorModal from '../ConnectorModal'

export default function ConnectButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const hooks = usePriorityConnectorHooks()
  const isActive = hooks.usePriorityIsActive()
  const isActivating = hooks.usePriorityIsActivating()

  const toggleConnectionModal = useCallback(() => setOpen(!open), [open])

  if (isActive) {
    router.push('/mint')
    return null
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
