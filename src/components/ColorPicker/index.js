import React from 'react'

import Button from 'components/Ui/Button'

import './style'

// TODO: Replace buttons with cards
const ColorPicker = ({ onClick }) => {
  // TODO: fetch colors from constants; add support for more colors
  const colors = ['RED', 'BLUE', 'YELLOW', 'GREEN']
  return (
    <div className='drawn-card'>
      <div className='drawn-card__banner'>
        {colors.map(color => (
          <Button onClick={() => { onClick(color) }} key={color}>
            {color}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
