import { isAddress } from '@ethersproject/address'
import Modal from 'components/Modal'
import { useUpdateAtom } from 'jotai/utils'
import { mintAtom } from 'pages/mint'
import { useCallback, useState } from 'react'

import { SendToHeart } from '../Heart'
import styles from './SendToModal.module.scss'

interface SendToModalProps {
  close: () => void
}

export default function SendToModal({ close }: SendToModalProps) {
  const setMintState = useUpdateAtom(mintAtom)
  const [address, setAddress] = useState('')

  const saveAddress = useCallback(() => {
    try {
      if (isAddress(address)) {
        setMintState((state) => ({ ...state, recipient: address }))
        close()
      }
    } catch (error) {
      console.error('error', error)
    }
  }, [address, close, setMintState])

  return (
    <Modal close={close}>
      <SendToHeart />
      <h1 className={styles.title}>Paste Eth Address</h1>
      <input
        className={styles.addressInput}
        type="text"
        placeholder="0x..."
        value={address}
        onChange={({ target: { value } }) => setAddress(value)}
      />
      <button onClick={saveAddress} className={styles.saveAddressButton}>
        SAVE ADDRESS
      </button>
    </Modal>
  )
}
