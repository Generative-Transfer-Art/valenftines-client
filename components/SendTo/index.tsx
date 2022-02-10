import { isAddress } from '@ethersproject/address'
import CloseButton from 'components/CloseButton'
import { useUpdateAtom } from 'jotai/utils'
import { mintAtom } from 'pages/mint'
import { useCallback, useState } from 'react'

import { Gm } from '../Heart'
import styles from './SendTo.module.scss'

interface SendToProps {
  close: () => void
}

export default function SendTo({ close }: SendToProps) {
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
      <button onClick={saveAddress} className={styles.saveAddressButton}>
        SAVE ADDRESS
      </button>
    </div>
  )
}
