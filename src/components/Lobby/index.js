import React from 'react'

import Button from 'components/Ui/Button'

import './style'

const Lobby = ({ socketActions, match, profile: { username } }) => {
  const { id: matchId, players, host } = match

  const startMatch = () => {
    socketActions.startMatch({
      matchId
    })
  }

  return (
    <div className='lobby'>
      <h1 className='lobby__heading'>Lobby</h1>

      <div className='player-list'>
        {players.map((player, index) => <PlayerTab data={player} isHost={host === player.username} key={index} />)}
      </div>

      {host === username && <Button onClick={startMatch}>Start game</Button>}
      {host !== username && <Button disabled>Waiting for host</Button>}
    </div>
  )
}

const PlayerTab = ({ data, isHost }) => {
  const { name, img = 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png' } = data
  return (
    <div className='player-tab'>
      <img className='player-tab__img' src={img} />
      <div className='player-tab__name'>{name}</div>
      {isHost && <span className='player-tab__host'>Host</span>}
    </div>
  )
}

export default Lobby
