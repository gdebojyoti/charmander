import React from 'react'

import './style'

const Card = ({ data, style }) => {
  const { name, type, color } = data

  const cardClass = ['card']

  color === 'RED' && cardClass.push('card--red')
  color === 'BLUE' && cardClass.push('card--blue')
  color === 'YELLOW' && cardClass.push('card--yellow')
  color === 'GREEN' && cardClass.push('card--green')
  color === 'BLACK' && cardClass.push('card--black')

  if (type === 'ACTION') {
    return null
  }

  return (
    <div className={cardClass.join(' ')} style={style}>
      {name}
    </div>
  )
}

export default Card
