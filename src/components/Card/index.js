import React from 'react'

import './style'

const Card = ({ data, ...rest }) => {
  const { name, type, color } = data

  const cardClass = ['card']

  color === 'RED' && cardClass.push('card--red')
  color === 'BLUE' && cardClass.push('card--blue')
  color === 'YELLOW' && cardClass.push('card--yellow')
  color === 'GREEN' && cardClass.push('card--green')

  if (type === 'NUMBER') {
    return <NumericCard className={cardClass.join(' ')} {...rest} name={name} />
  }

  if (type === 'ACTION') {
    if (name === 'WILD_DRAW_FOUR') {
      cardClass.push('card--wild')
      return <WildCard className={cardClass.join(' ')} {...rest} name='+4' />
    }

    if (name === 'WILD') {
      cardClass.push('card--wild')
      return <WildCard className={cardClass.join(' ')} {...rest} name='' prefix='WILD' />
    }

    if (name === 'DRAW_TWO') {
      return <NumericCard className={cardClass.join(' ')} {...rest} name='+2' />
    }

    if (name === 'SKIP') {
      return <SymbolCard className={cardClass.join(' ')} {...rest} symbol='skip' />
    }

    if (name === 'REVERSE') {
      return <SymbolCard className={cardClass.join(' ')} {...rest} symbol='reverse' />
    }
  }

  console.warn('Card design missing. Card data:', data)
  return <div>Pending design..</div>
}

const NumericCard = ({ className, name, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {name}
      <div className='card__prefix'>{name}</div>
    </div>
  )
}

const SymbolCard = ({ className, symbol, ...rest }) => {
  const symbolClass = `card__symbol card__symbol--${symbol}`
  const prefixClass = `card__symbol-prefix card__symbol-prefix--${symbol}`
  return (
    <div className={className} {...rest}>
      <div className={symbolClass} />
      <div className={prefixClass} />
    </div>
  )
}

const WildCard = ({ className, name, prefix = name, ...rest }) => {
  return (
    <div className={className} {...rest}>
      <div className='card__wild-circle'>
        <div className='card__wild-quadrant' />
        <div className='card__wild-quadrant' />
        <div className='card__wild-quadrant' />
        <div className='card__wild-quadrant' />

        <div className='card__wild-name'>{name}</div>
      </div>
      <div className='card__prefix'>{prefix}</div>
    </div>
  )
}

export default Card
