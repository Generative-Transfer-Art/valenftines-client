import styles from './CloseButton.module.scss'

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick} id="modal-close-button">
      💔
    </button>
  )
}
