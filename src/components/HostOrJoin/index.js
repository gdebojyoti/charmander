import React, { useState, useEffect } from 'react'

import Button from 'components/Ui/Button'

import { getValue, remove } from 'utilities/localStorage'

import './style'

const HostOrJoin = ({ onHost, onJoin: onJoinProp }) => {
  const [showInput, setShowInput] = useState(false)
  const [code, setCode] = useState('')

  useEffect(() => {
    // check for match code in local storage
    const code = getValue('matchCode')

    // auto-join match if code if found
    if (code) {
      setShowInput(true)
      setCode(code)
      onJoinProp(code)

      remove('matchCode')
    }
  }, [])

  const onChange = e => {
    setCode(e.target.value)
  }

  const onJoin = () => {
    code && onJoinProp(code)
  }

  return (
    <div className='host-join'>
      {!showInput && (
        <>
          <Button onClick={onHost}>Host Game</Button>
          <Button onClick={() => setShowInput(true)}>Join Game</Button>
        </>
      )}
      {showInput && (
        <>
          <input value={code} onChange={onChange} type='text' className='host-join__input' placeholder='Enter Code' autoFocus />
          <Button onClick={onJoin}>Join Game</Button>
          <Button isSecondary onClick={() => setShowInput(false)}>Back</Button>
        </>
      )}
    </div>
  )
}

export default HostOrJoin
