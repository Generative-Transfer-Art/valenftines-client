import * as Hearts from 'components/Heart'
import HeartPickerModal from 'components/HeartPickerModal'
import { useAtom } from 'jotai'
import { mintAtom } from 'pages/mint'
import { useCallback, useState } from 'react'

import styles from './HeartPicker.module.scss'

export default function HeartPicker({ openAddressGetter }: { openAddressGetter: () => void }) {
  const [{ id1: heart1, id2: heart2, id3: heart3 }, setMintState] = useAtom(mintAtom)
  const [presentHeartPicker, setPresentHeartPicker] = useState<boolean>(false)
  const [selectedHeart, setSelectedHeart] = useState<number>(0)

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

  return (
    <div>
      {presentHeartPicker ? <HeartPickerModal selectHeart={(h) => setHeart(h)} /> : ''}
      <div className={styles.heartsWrapper}>
        <div className={styles.sendFromHeart}>
          <Hearts.AddressHeart address={'0x00'} />
        </div>
        <div className={styles.sendToHeart}>
          <Hearts.SendToHeart onClick={openAddressGetter} />
        </div>

        <div className={styles.heart1} onClick={() => present(1)}>
          {heart1 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart1} />}
        </div>
        <div className={styles.heart2} onClick={() => present(2)}>
          {heart2 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart2} />}
        </div>
        <div className={styles.heart3} onClick={() => present(3)}>
          {heart3 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart3} />}
        </div>
      </div>
    </div>
  )
}