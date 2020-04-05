import React from 'react'

import BasicPage from 'components/Ui/BasicPage'
import Button from 'components/Ui/Button'

import './style'

const Lobby = ({ socketActions, match, profile: { username } }) => {
  const { id: matchId, players, host } = match

  const startMatch = () => {
    socketActions.startMatch({
      matchId
    })
  }

  const isHost = host === username

  const subheading = (
    <span>
      List of all the players in this match
      <br />
      A minimum of 2 players is needed
      <br />
      Only {isHost ? 'you' : 'the host'} can start the game
    </span>
  )

  let button = null

  if (players.length < 2) {
    button = <Button disabled>Start game</Button>
  } else if (isHost) {
    button = <Button onClick={startMatch}>Start game</Button>
  } else {
    button = <Button disabled>Waiting for host</Button>
  }

  return (
    <BasicPage heading='Lobby' subheading={subheading} className='lobby'>
      <div className='player-list'>
        {players.map((player, index) => <PlayerTab data={player} isHost={host === player.username} key={index} />)}
      </div>

      {button}
    </BasicPage>
  )
}

const PlayerTab = ({ data, isHost }) => {
  const { name, img = 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png' } = data
  return (
    <div className='player-tab'>
      <img className='player-tab__img' src={img} />
      <div className='player-tab__name'>{name}</div>
      {isHost && <span className='player-tab__host'>Host</span>}
    </div>
  )
}

export default Lobby
