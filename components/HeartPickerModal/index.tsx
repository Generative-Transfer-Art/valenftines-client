import * as Hearts from 'components/Heart'
import Modal from 'components/Modal'
import modalStyles from 'components/Modal/Modal.module.scss'

import styles from './HeartPickerModal.module.scss'

interface HeartPickerModalProps {
  close: () => void
  selectHeart: (heartType: number) => void
}

export default function HeartPickerModal({ close, selectHeart }: HeartPickerModalProps) {
  const tier1Hearts = new Array(10)
    .fill(1)
    .map((_, i) => (
      <Hearts.TextHeart heartType={i + 1} key={i} classes={[styles.heart]} onClick={() => selectHeart(i + 1)} />
    ))

  const tier2Hearts = new Array(7)
    .fill(7)
    .map((_, i) => (
      <Hearts.TextHeart
        classes={[styles.heart]}
        heartType={i + 11}
        onClick={() => selectHeart(i + 11)}
        key={`tier-2-${i}`}
      />
    ))
  const tier3Hearts = new Array(5)
    .fill(7)
    .map((_, i) => (
      <Hearts.TextHeart
        classes={[styles.heart]}
        heartType={i + 11}
        onClick={() => selectHeart(i + 11)}
        key={`tier-3-${i}`}
      />
    ))

  return (
    <Modal close={close}>
      <div className={[modalStyles.content, styles.content].join(' ')}>
        <div className={styles.row}>
          <h1 className={styles.price}>0.01 ETH</h1>
          <div className={styles.heartWrapper}>{tier1Hearts}</div>
        </div>
        <div className={styles.row}>
          <h1 className={styles.price}>0.02 ETH</h1>
          <div className={styles.heartWrapper}>{tier2Hearts}</div>
        </div>
        <div className={styles.row}>
          <h1 className={styles.price}>0.1 ETH</h1>
          <div className={styles.heartWrapper}>{tier3Hearts}</div>
        </div>
        <div className={styles.row}>
          <h1 className={styles.price}>1 ETH</h1>
          <div className={styles.heartWrapper}>
            <Hearts.TextHeart classes={[styles.heart]} heartType={23} onClick={() => selectHeart(23)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
