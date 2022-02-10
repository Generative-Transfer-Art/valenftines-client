import CloseButton from 'components/CloseButton'
import { PropsWithChildren } from 'react'

import styles from './Modal.module.scss'

interface ModalProps {
  close: () => void
  contentClassName?: string
}

export default function Modal({ contentClassName, children, close }: PropsWithChildren<ModalProps>) {
  const classes = [styles.innerWrapper]
  if (contentClassName) {
    classes.push(contentClassName)
  }
  return (
    <div className={styles.wrapper} onClick={close}>
      <div className={classes.join(' ')} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={close} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
