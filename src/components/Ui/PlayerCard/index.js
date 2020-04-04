import React from 'react'

import './style'

const PlayerCard = ({ data, isTurn, disabled = false, hideCardCount = false }) => {
  // TODO: fix data for img, isOnline & cardCount
  const {
    name,
    img = 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline = true,
    cards = [],
    cardCount = cards.length
  } = data

  const mainClass = `opponent-card ${isTurn ? 'opponent-card--active' : ''} ${disabled ? 'opponent-card--disabled' : ''}`
  const imgClass = `opponent-card__img ${isOnline ? 'opponent-card__img--online' : ''}`
  const cardCountClass = `opponent-card__card-count ${cardCount < 2 ? 'opponent-card__card-count--warn' : ''}`

  return (
    <div className={mainClass}>
      <img className={imgClass} src={img} />
      <div className='opponent-card__name'>{name}</div>
      {!hideCardCount && <div className={cardCountClass}>{cardCount}</div>}
    </div>
  )
}

export default PlayerCard
