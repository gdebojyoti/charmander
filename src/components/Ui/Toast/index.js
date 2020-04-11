import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './style'

const Alert = ({ message, message: { type, text } }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!text) {
      return
    }

    let timer = null

    setTimeout(() => {
      setShow(true)
      timer = setTimeout(() => {
        setShow(false)
      }, 2000)
    }, 0)
    return () => {
      clearTimeout(timer)
      timer = null
      setShow(false)
    }
  }, [message])

  if (show) {
    const mainClass = ['toast']
    type === 'WARNING' && mainClass.push('toast--error')
    type === 'SUCCESS' && mainClass.push('toast--success')
    return (
      <div className={mainClass.join(' ')}>
        {text}
      </div>
    )
  }

  return null
}

const mapStateToProps = ({
  message
}) => ({
  message
})

export default connect(mapStateToProps)(Alert)
