import React from 'react'

import OpponentCard from 'components/Ui/OpponentCard'
import Card from 'components/Ui/Card'

import './style'

const opponents = [
  {
    name: 'Dexter Grindelwald',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 6
  },
  {
    name: 'Dexter Grindelwald',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 19
  },
  {
    name: 'Dexter Grindelwald',
    img: 'https://www.pinclipart.com/picdir/middle/180-1800122_cartoon-skeleton-head-png-clipart.png',
    isOnline: true,
    cardCount: 1
  },
  {
    name: 'Dexter Grindelwald',
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
    name: 2,
    type: 'NUMBER',
    color: 'RED'
  },
  {
    name: 3,
    type: 'NUMBER',
    color: 'YELLOW'
  },
  {
    name: 9,
    type: 'NUMBER',
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
    name: 3,
    type: 'NUMBER',
    color: 'YELLOW'
  },
  {
    name: 9,
    type: 'NUMBER',
    color: 'BLACK'
  }
]

const angles = []
const angleLimit = 10
for (let i = 0; i < 10; i++) {
  angles.push(Math.random(1) * angleLimit * 2 - angleLimit)
}

const Ui = () => {
  return (
    <div className='device'>
      <div className='arena'>
        <OpponentCards data={opponents} />
        <CardStack data={cards} />
        <PlayerHand data={cards} />
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
            <OpponentCard data={opponent} isTurn={index === 1} key={index} />
          </div>
        )
      })}
    </div>
  )
}

const CardStack = ({ data }) => {
  return (
    <div className='card-stack'>
      {data.map((card, index) => {
        const styles = {
          transform: `rotate(${angles[index % angles.length]}deg)`
        }
        return <Card data={card} style={styles} key={index} />
      })}
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

const Base = () => {
  return (
    <div className='base'>
      More stuff coming soon...
    </div>
  )
}

export default Ui
