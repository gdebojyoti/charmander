import React, { useEffect, useState } from 'react'

import Card from 'components/Card'

import './style'

const PlayerHand = ({ active, data = [], onCardSelect }) => {
  // when ready = true, start showing (fade in & translate) player's cards
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 500)
  }, [])

  const [hiddenCard, setHiddenCard] = useState(0)

  // on click, try to play card
  const onClickCard = (id, index) => {
    console.log('Card clicked on', id)
    setHiddenCard(id)
    onCardSelect(id, true)
  }

  const mainStyle = {
    width: (data.length - 1) * 55 + 100 + 20
  }

  const sortedCards = [...data].sort((a, b) => {
    // arrange in increasing value of ID
    return a.id < b.id ? -1 : 1
  })

  const wrapperClass = ['player-hand']
  active && wrapperClass.push('player-hand--active')

  return (
    <div className={wrapperClass.join(' ')}>
      <div className='player-hand__main' style={mainStyle}>
        {sortedCards.map((card, index) => {
          // styles for fading in & transforming
          const style = {
            visibility: hiddenCard === card.id ? 'hidden' : 'visible',
            transform: `translateX(${10 + index * 55}px)`,
            opacity: 1
          }

          /*
           * TODO:
           * figure out why this works (overflow works even though children are absolutely positioned; as long as transform is applied)
           * seemingly because width is applied to parent (mainStyle)
           * ensure it works in major browsers
           * try to insert some gap after last card
           */
          return (
            <div className='player-hand__card-wrapper' id={`player-card-${card.id}`} style={ready ? style : {}} key={card.id} onClick={() => onClickCard(card.id, index)}>
              <Card data={card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerHand
