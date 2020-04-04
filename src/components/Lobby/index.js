import React from 'react'

const Lobby = ({ startGame }) => {
  return (
    <div>
      Lobby -
      Player list

      <button onClick={startGame}>Start game!</button>
    </div>
  )
}

export default Lobby
