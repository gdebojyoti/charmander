import React from 'react'

import './style'

const PlayerCard = ({ data, isTurn, disabled = false, hideCardCount = false }) => {
  // TODO: fix data for img, isOnline & cardCount
  const {
    name,
    img = 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
    cards = [],
    cardCount = cards.length,
    borderId // 1 for debojyoti
  } = data

  // TODO: find a way to depict online status

  const mainClass = `player-card ${isTurn ? 'player-card--active' : ''} ${disabled ? 'player-card--disabled' : ''}`
  const frameClass = `player-card__frameset ${borderId === 100 ? 'player-card__frameset--flashy' : ''}`
  const cardCountClass = `player-card__card-count ${cardCount < 2 ? 'player-card__card-count--warn' : ''}`

  return (
    <div className={mainClass}>
      <div className={frameClass}>
        <div className='player-card__frame' />
        <img className='player-card__img' src={img} />
      </div>
      <div className='player-card__name'>{name}</div>
      {!hideCardCount && <div className={cardCountClass}>{cardCount}</div>}
    </div>
  )
}

export default PlayerCard
