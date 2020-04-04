import React from 'react'

import './style'

const DrawCard = ({ onClick }) => {
  return (
    <div className='draw-card draw-card--active' onClick={onClick}>
      Draw
    </div>
  )
}

export default DrawCard
