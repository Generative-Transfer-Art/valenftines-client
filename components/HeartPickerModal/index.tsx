import * as Hearts from 'components/Heart'

import styles from './HeartPickerModal.module.scss'

interface HeartPickerModalProps {
  selectHeart: (heartType: number) => void
}

export default function HeartPickerModal({ selectHeart }: HeartPickerModalProps) {
  const tier1Hearts = Array.apply(null, Array(10)).map(function (_, i) {
    return (
      <div className={styles.heart} onClick={() => selectHeart(i + 1)}>
        {' '}
        <Hearts.TextHeart heartType={i + 1} key={i} />{' '}
      </div>
    )
  })

  const tier2Hearts = Array.apply(null, Array(7)).map(function (_, i) {
    return (
      <div className={styles.heart} onClick={() => selectHeart(i + 11)}>
        {' '}
        <Hearts.TextHeart heartType={i + 11} key={i} />{' '}
      </div>
    )
  })
  return (
    <div className={styles.heartPickerModalWrapper}>
      <div className={styles.tier1HeartsWrapper}>{tier1Hearts}</div>
      <div className={styles.tier2HeartsWrapper}>{tier2Hearts}</div>
    </div>
  )
}
