import React, { FC } from 'react'
import styles from './Button.module.scss'

type PropsType = {
  children: string
  type?: 'button' | 'submit' | 'reset' | undefined
  callBack?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
}

const Button: FC<PropsType> = ({
  children,
  type = 'button',
  callBack,
  disabled = false,
}) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (callBack) {
      callBack(e)
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={(e) => onClick(e)}
      className={styles.button}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
