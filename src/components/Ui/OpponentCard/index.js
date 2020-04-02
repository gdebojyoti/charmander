import React from 'react'

import './style'

const OpponentCard = ({ data, isTurn }) => {
  const { name, img, isOnline, cardCount } = data

  const mainClass = `opponent-card ${isTurn && 'opponent-card--active'}`
  const imgClass = `opponent-card__img ${isOnline && 'opponent-card__img--online'}`
  const cardCountClass = `opponent-card__card-count ${cardCount < 2 && 'opponent-card__card-count--warn'}`

  return (
    <div className={mainClass}>
      <img className={imgClass} src={img} />
      <div className='opponent-card__name'>{name}</div>
      <div className={cardCountClass}>{cardCount}</div>
    </div>
  )
}

export default OpponentCard
