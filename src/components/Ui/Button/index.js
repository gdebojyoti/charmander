import React from 'react'

import './style'

// TODO: Provide support for alternate styles (secondary, tertiary, alternate), sizes (small, large)
const Button = ({ children, disabled = false, ...rest }) => {
  const mainClass = ['button']
  disabled && mainClass.push('button--disabled')

  const props = {
    disabled,
    ...rest
  }
  return (
    <button className={mainClass.join(' ')} {...props}>{children}</button>
  )
}

export default Button
