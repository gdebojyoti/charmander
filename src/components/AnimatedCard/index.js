// card responsible for animations
// TODO: Support for multiple cards (eg: 'DRAW_TWO')

import React, { useState, useEffect } from 'react'

import Card from 'components/Card'

import './style'

const AnimatedCard = ({ data: id, cards, onComplete }) => {
  const [style, setStyle] = useState({})
  const [data, setData] = useState(null)

  useEffect(() => {
    const discardPile = document.getElementById('discard-pile-container')
    const { x: pileX, y: pileY } = discardPile.getBoundingClientRect()

    const elm = document.getElementById(`player-card-${id}`)
    const { x, y } = elm.getBoundingClientRect()

    setData(cards.find(card => card.id === id))

    // NOTE: extra 7px needed to position card correctly - this is (probably) required because of card's rotation
    setStyle({
      transform: `translate(${x}px, ${y + 7}px) rotate(-3deg)`
    })

    setTimeout(() => {
      setStyle({
        transform: `translate(${pileX}px, ${pileY}px) rotate(-360deg)`,
        transition: 'transform .5s'
      })
    }, 200)

    // setTimeout(() => {
    //   onComplete()
    // }, 1000)
  }, [])

  if (!data) {
    return null
  }

  // NOTE: The background layer automatically prevents the player from selecting any other card while card animation is in progress
  return (
    <div className='animated-card-bg'>
      <div className='animated-card' style={style}>
        <Card data={data} />
      </div>
    </div>
  )
}

export default AnimatedCard
