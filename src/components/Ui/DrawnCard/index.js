import React, { useState, useEffect } from 'react'

import Card from 'components/Ui/Card'

import './style'

// TODO: Show 'drawing' text till new card is available; remove fake delay
const DrawnCard = ({ data, onKeep, onPlay }) => {
  const [isCardReady, setIsCardReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsCardReady(true)
    }, 10)
  }, [])

  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {isCardReady && (
          <>
            <button className='drawn-card__button' onClick={onKeep}>Keep</button>
            <Card data={data} />
            <button className='drawn-card__button' onClick={onPlay}>Play</button>
          </>
        )}
        {!isCardReady && 'Drawing card...'}
      </div>
    </div>
  )
}

export default DrawnCard
