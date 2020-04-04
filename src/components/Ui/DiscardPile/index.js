import React from 'react'

import Card from 'components/Ui/Card'

import './style'

const angles = []
const angleLimit = 15
for (let i = 0; i < 10; i++) {
  angles.push(Math.random(1) * angleLimit * 2 - angleLimit)
}

const DiscardPile = ({ data, isReversed }) => {
  const imageClass = `discard-pile__direction-container ${isReversed ? 'discard-pile__direction-container--reversed' : ''}`
  const discardedCards = data.length > 5 ? data.slice(data.length - 5) : data

  return (
    <div className='discard-pile'>
      <div className={imageClass}>
        <div className='discard-pile__direction' />
      </div>
      <div className='discard-pile__card-container'>
        {discardedCards.map((card, index) => {
          const styles = {
            transform: `rotate(${angles[index % angles.length]}deg)`
          }
          return <Card data={card} style={styles} key={index} />
        })}
      </div>
    </div>
  )
}

export default DiscardPile
