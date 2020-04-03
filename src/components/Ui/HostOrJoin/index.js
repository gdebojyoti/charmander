import React, { useState } from 'react'

import './style'

const HostOrJoin = ({ isShowing, onHost, onJoin: onJoinProp }) => {
  const [showInput, setShowInput] = useState(false)
  const [code, setCode] = useState('')

  const onChange = e => {
    setCode(e.target.value)
  }

  const onJoin = () => {
    code && onJoinProp(code)
  }

  const mainClass = `host-join ${isShowing ? 'host-join--visible' : ''}`

  return (
    <div className={mainClass}>
      {!showInput && (
        <>
          <button className='host-join__button' onClick={onHost}>Host Game</button>
          <button className='host-join__button' onClick={() => setShowInput(true)}>Join Game</button>
        </>
      )}
      {showInput && (
        <>
          <input value={code} onChange={onChange} type='text' className='host-join__input' placeholder='Enter Code' autoFocus />
          <button className='host-join__button' onClick={onJoin}>Join Game</button>
          <button className='host-join__button host-join__button--disabled' onClick={() => setShowInput(false)}>Back</button>
        </>
      )}
    </div>
  )
}

export default HostOrJoin
