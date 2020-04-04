import React, { useState } from 'react'

import './style'

const HostOrJoin = ({ onHost, onJoin: onJoinProp }) => {
  const [showInput, setShowInput] = useState(false)
  const [code, setCode] = useState('31291')

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
