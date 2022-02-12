import { isAddress } from '@ethersproject/address'
import Button from 'components/Button'
import Modal from 'components/Modal'
import modalStyles from 'components/Modal/Modal.module.scss'
import useDebounce from 'hooks/useDebounce'
import useInterval from 'hooks/useInterval'
import { useUpdateAtom } from 'jotai/utils'
import { mintAtom } from 'pages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SupportedChainId } from 'types'
import { useNetwork, useProvider } from 'wagmi'

import { SendToHeart } from '../Heart'
import styles from './SendToModal.module.scss'

interface SendToModalProps {
  close: () => void
}

export default function SendToModal({ close }: SendToModalProps) {
  const setMintState = useUpdateAtom(mintAtom)
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)
  const [{ data: networkData }] = useNetwork()
  const provider = useProvider()

  const [derivedAddress, setDerivedAddress] = useState('')
  const [derivedName, setDerivedName] = useState('')
  useEffect(() => {
    if (debouncedInput && isAddress(debouncedInput) && provider) {
      provider.lookupAddress(debouncedInput).then((name) => setDerivedName(name || ''))
    } else if (debouncedInput && !isAddress(debouncedInput) && provider) {
      provider.resolveName(debouncedInput).then((address) => setDerivedAddress(address || ''))
    } else if (!debouncedInput) {
      setDerivedAddress('')
      setDerivedName('')
    }
  }, [debouncedInput, provider])

  const canSubmit = useMemo(
    () => (debouncedInput && isAddress(debouncedInput)) || derivedName || derivedAddress,
    [derivedAddress, debouncedInput, derivedName]
  )

  useEffect(() => {
    setInput('')
  }, [networkData.chain?.id])

  const saveAddress = useCallback(() => {
    if (!canSubmit) return
    if (isAddress(debouncedInput)) {
      setMintState((state) => ({ ...state, recipient: debouncedInput }))
      close()
    } else if (derivedAddress) {
      setMintState((state) => ({ ...state, recipient: derivedAddress }))
      close()
    }
  }, [derivedAddress, canSubmit, close, debouncedInput, setMintState])

  const [placeholder, setPlaceholder] = useState('0x...')
  useInterval(() => {
    if (Math.random() * 10 > 5) {
      setPlaceholder(`0x${Math.random().toString(16).substring(2, 6)}...`)
    } else {
      setPlaceholder(`...eth`)
    }
  }, 5000)

  const etherscanLink = useMemo(() => {
    if (isAddress(debouncedInput)) {
      return `https://${
        networkData.chain?.id === SupportedChainId.RINKEBY ? 'rinkeby.' : ''
      }etherscan.io/address/${debouncedInput}`
    } else if (derivedAddress) {
      return `https://${
        networkData.chain?.id === SupportedChainId.RINKEBY ? 'rinkeby.' : ''
      }etherscan.io/address/${derivedAddress}`
    }
  }, [derivedAddress, debouncedInput, networkData.chain?.id])

  return (
    <Modal close={close}>
      <div className={modalStyles.content} id={styles.content}>
        <SendToHeart classes={[styles.sendToHeart]} />
        <h1 className={styles.title}>Choose Recipient</h1>
        <i>ens name or address</i>

        <input
          className={styles.addressInput}
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={({ target: { value } }) => setInput(value)}
        />
        <a href={etherscanLink} target="_blank" rel="noopener noreferrer" className={styles.derivedENSOrAddress}>
          {derivedName ? (
            <i>❤️{derivedName}❤️</i>
          ) : (
            derivedAddress && (
              <i>
                ❤️{derivedAddress.substring(0, 8)}...
                {derivedAddress.substring(derivedAddress.length - 8, derivedAddress.length)}❤️
              </i>
            )
          )}
        </a>
        <Button onClick={saveAddress} className={styles.saveAddressButton} disabled={!canSubmit}>
          SAVE ADDRESS
        </Button>
      </div>
    </Modal>
  )
}
