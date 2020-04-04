import React from 'react'

import './style'

// TODO: Replace buttons with cards
const ColorPicker = ({ onClick }) => {
  // TODO: fetch colors from constants; add support for more colors
  const colors = ['RED', 'BLUE', 'YELLOW', 'GREEN']
  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {colors.map(color => (
          <button className='drawn-card__button' onClick={() => { onClick(color) }} key={color}>
            {color}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
