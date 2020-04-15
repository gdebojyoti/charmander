import React, { useState, useEffect } from 'react'

import Card from 'components/Card'

import './style'

// TODO: Show 'drawing' text till new card is available; remove fake delay
const DrawnCard = ({ data, onKeep, onPlay, playableCards }) => {
  const [isCardReady, setIsCardReady] = useState(false)
  useEffect(() => {
    if (playableCards.indexOf(data.id) > -1) {
      // if drawn card is playable, give option to keep / play
      setTimeout(() => {
        setIsCardReady(true)
      }, 10)
    } else {
      // if drawn card is unplayable, keep card automatically & continue game
      onKeep()
    }
  }, [])

  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {isCardReady && (
          <>
            <button className='drawn-card__button' onClick={onKeep}>Keep</button>
            <Card data={data} />
            <button className='drawn-card__button' onClick={() => onPlay(data.id)}>Play</button>
          </>
        )}
        {!isCardReady && 'Drawing card...'}
      </div>
    </div>
  )
}

export default DrawnCard
