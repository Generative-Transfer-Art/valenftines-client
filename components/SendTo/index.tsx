import CloseButton from 'components/CloseButton'
import { useState } from 'react'

import { Gm } from '../Heart'
import styles from './SendTo.module.scss'

interface SendToProps {
  saveAddress: (address: string) => void
  close: () => void
}

export default function SendTo({ saveAddress, close }: SendToProps) {
  const [address, setAddress] = useState('')
  return (
    <div className={styles.wrapper}>
      <CloseButton onClick={close} />
      <Gm />
      <h1 className={styles.title}>Paste Eth Address</h1>
      <input
        className={styles.addressInput}
        type="text"
        placeholder="0x..."
        value={address}
        onChange={({ target: { value } }) => setAddress(value)}
      />
      <button onClick={() => saveAddress(address)} className={styles.saveAddressButton}>
        SAVE ADDRESS
      </button>
    </div>
  )
}
