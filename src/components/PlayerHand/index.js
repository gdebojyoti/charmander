import React, { useEffect, useState } from 'react'

import Card from 'components/Card'

import './style'

const PlayerHand = ({ data = [], onCardSelect }) => {
  // when ready = true, start showing (fade in & translate) player's cards
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 500)
  }, [])

  // on click, try to play card
  const onClickCard = (id) => {
    console.log('Card clicked on', id)
    onCardSelect(id)
  }

  const mainStyle = {
    width: (data.length - 1) * 55 + 100 + 20
  }

  return (
    <div className='player-hand'>
      <div className='player-hand__main' style={mainStyle}>
        {data.map((card, index) => {
          // styles for fading in & transforming
          const style = {
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
            <div className='player-hand__card-wrapper' style={ready ? style : {}} key={card.id} onClick={() => onClickCard(card.id)}>
              <Card data={card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerHand
