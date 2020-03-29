import React from 'react'

const HostOrJoin = ({ onHost, onJoin }) => {
  return (
    <div>
      <button onClick={onHost}>Host Game</button>
      <button onClick={onJoin}>Join Game</button>
    </div>
  )
}

export default HostOrJoin
