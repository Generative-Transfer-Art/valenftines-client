import ConnectorModal from 'components/ConnectorModal'
import * as Hearts from 'components/Heart'
import HeartPickerModal from 'components/HeartPickerModal'
import { useAtom } from 'jotai'
import { mintAtom } from 'pages/mint'
import { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'

import styles from './HeartPicker.module.scss'

export default function HeartPicker({ openAddressGetter }: { openAddressGetter: () => void }) {
  const [{ recipient, id1: heart1, id2: heart2, id3: heart3 }, setMintState] = useAtom(mintAtom)
  const [presentHeartPicker, setPresentHeartPicker] = useState<boolean>(false)
  const toggleHeartPickerModal = useCallback(() => setPresentHeartPicker(!presentHeartPicker), [presentHeartPicker])
  const [selectedHeart, setSelectedHeart] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const toggleConnectionModal = useCallback(() => setOpen(!open), [open])
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  })

  const setHeart = useCallback(
    (heartType) => {
      if (selectedHeart == 1) {
        setMintState((state) => ({ ...state, id1: heartType }))
      } else if (selectedHeart == 2) {
        setMintState((state) => ({ ...state, id2: heartType }))
      } else {
        setMintState((state) => ({ ...state, id3: heartType }))
      }
      setPresentHeartPicker(false)
    },
    [selectedHeart, setMintState]
  )

  const present = useCallback((id) => {
    setSelectedHeart(id)
    setPresentHeartPicker(true)
  }, [])

  const pickerHeartClass = [styles.pickerHeart]
  return (
    <div>
      {open && <ConnectorModal close={toggleConnectionModal} />}
      {presentHeartPicker && <HeartPickerModal close={toggleHeartPickerModal} selectHeart={(h) => setHeart(h)} />}
      <div className={styles.heartsWrapper}>
        <div className={styles.sendFromHeart}>
          {accountData == null ? (
            <Hearts.ConnectHeart onClick={() => setOpen(true)} classes={pickerHeartClass} />
          ) : (
            <Hearts.AddressHeart address={accountData.address.slice(0, 6)} classes={pickerHeartClass} />
          )}
        </div>
        <div className={styles.sendToHeart}>
          {recipient == '' ? (
            <Hearts.SendToHeart onClick={openAddressGetter} classes={pickerHeartClass} />
          ) : (
            <Hearts.AddressHeart address={recipient.slice(0, 6)} classes={pickerHeartClass} />
          )}
        </div>

        <div className={styles.heart1} onClick={() => present(1)}>
          {heart1 == 0 ? (
            <Hearts.SelectMessageHeart classes={pickerHeartClass} />
          ) : (
            <Hearts.TextHeart heartType={heart1} classes={pickerHeartClass} />
          )}
        </div>
        <div className={styles.heart2} onClick={() => present(2)}>
          {heart2 == 0 ? (
            <Hearts.SelectMessageHeart classes={pickerHeartClass} />
          ) : (
            <Hearts.TextHeart heartType={heart2} classes={pickerHeartClass} />
          )}
        </div>
        <div className={styles.heart3} onClick={() => present(3)}>
          {heart3 == 0 ? (
            <Hearts.SelectMessageHeart classes={pickerHeartClass} />
          ) : (
            <Hearts.TextHeart heartType={heart3} classes={pickerHeartClass} />
          )}
        </div>
      </div>
    </div>
  )
}
