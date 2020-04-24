// card responsible for animations
// TODO: Support for multiple cards (eg: 'DRAW_TWO')

import React, { useState, useEffect } from 'react'

import Card from 'components/Card'

import './style'

const AnimatedCard = ({ id, src, dest, cards, onComplete }) => {
  const [style, setStyle] = useState({})
  const [data, setData] = useState(null)

  useEffect(() => {
    const elm = document.getElementById(src)
    const { x: srcX, y: srcY } = elm.getBoundingClientRect()

    const discardPile = document.getElementById(dest)
    const { x: destX, y: destY } = discardPile.getBoundingClientRect()

    setData(cards.find(card => card.id === id))

    // NOTE: extra 7px needed to position card correctly - this is (probably) required because of card's rotation
    setStyle({
      transform: `translate(${srcX}px, ${srcY + 7}px) rotate(-3deg)`
    })

    const transitionTimer = setTimeout(() => {
      setStyle({
        transform: `translate(${destX}px, ${destY}px) rotate(-360deg)`,
        transition: 'transform .5s'
      })
    }, 200)

    // const completeTimer = setTimeout(() => {
    //   onComplete()
    // }, 1000)

    return () => {
      clearTimeout(transitionTimer)
      // clearTimeout(completeTimer)
    }
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
