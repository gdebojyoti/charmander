import React from 'react'

import Card from 'components/Card'
import './style'

const PlayerCard = ({ data = {}, onCardSelect, onTake, onPass }) => {
  const { id, name, cards, canDraw, canPass } = data
  return (
    <div>
      <h3>
        {name}
        {canDraw && <button onClick={() => onTake(id)}>Take card</button>}
        {canPass && <button onClick={() => onPass(id)}>Pass</button>}
      </h3>

      <div className='cards'>
        {cards.map((card, index) => <Card key={index} data={card} onCardSelect={(options) => onCardSelect(index, id, options)} />)}
      </div>
    </div>
  )
}

export default PlayerCard
