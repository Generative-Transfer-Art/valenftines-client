import { isAddress } from '@ethersproject/address'
import Modal from 'components/Modal'
import modalStyles from 'components/Modal/Modal.module.scss'
import { useUpdateAtom } from 'jotai/utils'
import { mintAtom } from 'pages/mint'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { SendToHeart } from '../Heart'
import styles from './SendToModal.module.scss'

interface SendToModalProps {
  close: () => void
}

export default function SendToModal({ close }: SendToModalProps) {
  const setMintState = useUpdateAtom(mintAtom)
  const [address, setAddress] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      console.log(isAddress(address))
      if (!isAddress(address) && address) {
        setError(true)
      } else {
        setError(false)
      }
    } catch (error) {
      setError(true)
    }
  }, [address])

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

  const inputClasses = useMemo(() => {
    return error ? [styles.addressInput, styles.error] : [styles.addressInput]
  }, [error])
  const buttonClasses = useMemo(() => {
    return error ? [styles.saveAddressButton, styles.error] : [styles.saveAddressButton]
  }, [error])
  return (
    <Modal close={close}>
      <div className={[modalStyles.content, styles.content].join(' ')}>
        <SendToHeart classes={[styles.sendToHeart]} />
        <h1 className={styles.title}>Paste Eth Address</h1>
        <input
          className={inputClasses.join(' ')}
          type="text"
          placeholder="0x..."
          value={address}
          title={error ? 'invalid address' : ''}
          onChange={({ target: { value } }) => setAddress(value)}
        />
        <button
          onClick={saveAddress}
          className={buttonClasses.join(' ')}
          disabled={!address || error}
          title={error ? 'invalid address' : ''}
        >
          SAVE ADDRESS
        </button>
      </div>
    </Modal>
  )
}
