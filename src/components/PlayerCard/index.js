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

  const mainClass = `opponent-card ${isTurn ? 'opponent-card--active' : ''} ${disabled ? 'opponent-card--disabled' : ''}`
  const frameClass = `opponent-card__frameset ${borderId === 100 ? 'opponent-card__frameset--flashy' : ''}`
  const cardCountClass = `opponent-card__card-count ${cardCount < 2 ? 'opponent-card__card-count--warn' : ''}`

  return (
    <div className={mainClass}>
      <div className={frameClass}>
        <div className='opponent-card__frame' />
        <img className='opponent-card__img' src={img} />
      </div>
      <div className='opponent-card__name'>{name}</div>
      {!hideCardCount && <div className={cardCountClass}>{cardCount}</div>}
    </div>
  )
}

export default PlayerCard
