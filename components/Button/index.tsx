import styles from './Button.module.scss'

type BaseProps = {
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    variant?: 'pink' | 'black'
  }

export default function Button(props: ButtonProps) {
  const classes = [styles.baseButton]
  classes.push(props.variant === 'black' ? styles.blackButton : styles.pinkButton)
  if (props.className) {
    classes.push(props.className)
    delete props.className
  }
  return (
    <button className={classes.join(' ')} {...props}>
      {props.children}
    </button>
  )
}
