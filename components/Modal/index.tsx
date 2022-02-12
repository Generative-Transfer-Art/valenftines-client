import CloseButton from 'components/CloseButton'
import useKeyPress from 'hooks/useKeyPress'
import { PropsWithChildren, useEffect } from 'react'

import styles from './Modal.module.scss'

interface ModalProps {
  close: () => void
}

export default function Modal({ children, close }: PropsWithChildren<ModalProps>) {
  const escPressed = useKeyPress('Escape')

  useEffect(() => {
    if (escPressed) {
      close()
    }
  }, [close, escPressed])

  return (
    <div className={styles.wrapper} onClick={close} onScrollCapture={(e) => e.stopPropagation()}>
      <div className={styles.innerWrapper} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={close} />
        {children}
      </div>
    </div>
  )
}
