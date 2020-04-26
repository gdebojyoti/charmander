import React from 'react'

import BasicPage from 'components/Ui/BasicPage'
import Button from 'components/Ui/Button'

import whatsapp from 'assets/icons/whatsapp.svg'
import './style'

const Lobby = ({ socketActions, match, profile: { username } }) => {
  const { id: matchId, players, host, code } = match

  const startMatch = () => {
    socketActions.startMatch({
      matchId
    })
  }

  const shareToWhatsApp = () => {
    window.open(`whatsapp://send?text=Join me for a match of Uno - ${window.location.origin}/${code}`)
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

      <div className='lobby__code'>
        Match code: <strong>{code}</strong>
      </div>

      {button}

      <div className='lobby__secondary-btns'>

        <Button className='lobby__share-btn' isSecondary onClick={shareToWhatsApp}>
          Share on
          <img className='lobby__whatsapp-img' src={whatsapp} />
        </Button>
        <Button isSecondary onClick={() => socketActions.leaveMatch()}>Leave game</Button>
      </div>
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
