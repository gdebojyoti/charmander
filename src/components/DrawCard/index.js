import React from 'react'

import './style'

const DrawCard = ({ onClick, shouldFocus }) => {
  const mainClass = ['draw-card']
  shouldFocus && mainClass.push('draw-card--focus')
  return (
    <div className={mainClass.join(' ')} onClick={onClick}>
      Draw
    </div>
  )
}

export default DrawCard
