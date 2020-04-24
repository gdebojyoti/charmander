import React, { useState, useEffect } from 'react'

import Card from 'components/Card'
import Button from 'components/Ui/Button'

import './style'

// TODO: Show 'drawing' text till new card is available; remove fake delay
const DrawnCard = ({ data, onKeep, onPlay, playableCards }) => {
  const [isCardReady, setIsCardReady] = useState(false)
  useEffect(() => {
    let timer = null
    if (playableCards.indexOf(data.id) > -1) {
      // if drawn card is playable, give option to keep / play
      timer = setTimeout(() => {
        setIsCardReady(true)
      }, 10)
    } else {
      // if drawn card is unplayable, keep card automatically & continue game
      onKeep()
    }
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {isCardReady && (
          <>
            <Button onClick={onKeep}>Keep</Button>
            <Card data={data} />
            <Button onClick={() => onPlay(data.id)}>Play</Button>
          </>
        )}
        {!isCardReady && 'Drawing card...'}
      </div>
    </div>
  )
}

export default DrawnCard
