import React, { useState, useEffect } from 'react'

import OpponentCard from 'components/Ui/OpponentCard'
import Card from 'components/Ui/Card'

import './style'

const opponents = [
  {
    name: 'Harry Potter',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 6
  },
  {
    name: 'Hermione Granger',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 19
  },
  {
    name: 'Ron Weasley',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 1
  },
  {
    name: 'Tom Riddle',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 3
  }
]

const cards = [
  {
    name: 1,
    type: 'NUMBER',
    color: 'RED'
  },
  {
    name: 9,
    type: 'NUMBER',
    color: 'GREEN'
  },
  {
    name: 3,
    type: 'NUMBER',
    color: 'YELLOW'
  },
  {
    name: 'WILD',
    type: 'ACTION',
    color: 'BLACK'
  },
  {
    name: 1,
    type: 'NUMBER',
    color: 'RED'
  },
  {
    name: 2,
    type: 'NUMBER',
    color: 'BLUE'
  },
  {
    name: 'SKIP',
    type: 'ACTION',
    color: 'YELLOW'
  },
  {
    name: 'REVERSE',
    type: 'ACTION',
    color: 'YELLOW'
  },
  {
    name: 'DRAW_TWO',
    type: 'ACTION',
    color: 'YELLOW'
  },
  {
    name: 'WILD_DRAW_FOUR',
    type: 'ACTION',
    color: 'BLACK'
  }
]

const angles = []
const angleLimit = 15
for (let i = 0; i < 10; i++) {
  angles.push(Math.random(1) * angleLimit * 2 - angleLimit)
}

const Ui = () => {
  const [showDrawnCard, setShowDrawnCard] = useState(false)
  const isPlayersTurn = true
  const playerDetailsClass = `player-details ${isPlayersTurn ? 'player-details--active' : ''}`

  return (
    <div className='device'>
      <div className='arena'>
        <OpponentCards data={opponents} />

        <div className='mid-section'>
          <DrawCard onClick={() => setShowDrawnCard(true)} />
          <DiscardPile data={cards} />
        </div>

        <div className={playerDetailsClass}>
          <OpponentCard data={{ ...opponents[0], name: 'You' }} hideCardCount />
        </div>

        <PlayerHand data={cards} />

        {showDrawnCard && <DrawnCard data={cards[1]} />}
      </div>

      <Base />
    </div>
  )
}

const OpponentCards = ({ data }) => {
  return (
    <div className='opponent-cards'>
      {data.map((opponent, index) => {
        return (
          <div className='opponent-card-wrapper' key={index}>
            <OpponentCard data={opponent} isTurn={index === 1} disabled={index === 3} key={index} />
          </div>
        )
      })}
    </div>
  )
}

const DrawCard = ({ onClick }) => {
  return (
    <div className='draw-card draw-card--active' onClick={onClick}>
      Draw
    </div>
  )
}

const DiscardPile = ({ data }) => {
  return (
    <div className='discard-pile'>
      <div className='discard-pile__direction-container discard-pile__direction-container--reversed'>
        <div className='discard-pile__direction' />
      </div>
      <div className='discard-pile__card-container'>
        {data.map((card, index) => {
          const styles = {
            transform: `rotate(${angles[index % angles.length]}deg)`
          }
          return <Card data={card} style={styles} key={index} />
        })}
      </div>
    </div>
  )
}

const PlayerHand = ({ data }) => {
  const onClickCard = (id) => {
    console.log('Card clicked on', id)
  }
  return (
    <div className='player-hand'>
      <div className='player-hand__main'>
        {data.map((card, index) => {
          return (
            <div className='player-hand__card-wrapper' key={index} onClick={() => onClickCard(index)}>
              <Card data={card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const DrawnCard = ({ data }) => {
  const [isCardReady, setIsCardReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsCardReady(true)
    }, 1000)
  }, [])
  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {isCardReady && (
          <>
            <button className='drawn-card__button'>Keep</button>
            <Card data={data} />
            <button className='drawn-card__button'>Play</button>
          </>
        )}
        {!isCardReady && 'Drawing card...'}
      </div>
    </div>
  )
}

const Base = () => {
  return (
    <div className='base'>
      Under construction...
    </div>
  )
}

export default Ui
