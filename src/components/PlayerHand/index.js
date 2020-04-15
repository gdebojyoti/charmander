import React from 'react'

import Card from 'components/Card'

import './style'

const PlayerHand = ({ data = [], onCardSelect }) => {
  const onClickCard = (id) => {
    console.log('Card clicked on', id)
    onCardSelect(id)
  }
  return (
    <div className='player-hand'>
      <div className='player-hand__main'>
        {data.map((card, index) => {
          return (
            <div className='player-hand__card-wrapper' key={index} onClick={() => onClickCard(card.id)}>
              <Card data={card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerHand
