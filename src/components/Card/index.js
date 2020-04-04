// TODO: Delete this

import React, { useState } from 'react'

const Card = ({ data: { type, name, color } = {}, onCardSelect }) => {
  const data = [
    {
      label: 'Type',
      value: type
    },
    {
      label: 'Name',
      value: name
    },
    {
      label: 'Color',
      value: color
    }
  ]

  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    if (['WILD_DRAW_FOUR', 'WILD'].indexOf(name) > -1) {
      setIsOpen(true)
    } else {
      onCardSelect()
    }
  }

  const pickColor = (color) => {
    if (['WILD_DRAW_FOUR', 'WILD'].indexOf(name) > -1) {
      setIsOpen(false)
      onCardSelect({
        color
      })
    }
  }

  return (
    <div>
      {data.map(({ label, value }, index) => (
        <div key={index}>
          {label}: {value}
        </div>
      ))}
      {onCardSelect && <button onClick={onClick}>Select</button>}

      {isOpen && <ColorPicker pickColor={pickColor} />}
    </div>
  )
}

const ColorPicker = ({ pickColor }) => {
  const colors = ['RED', 'BLUE', 'YELLOW', 'GREEN']
  return (
    <div>
      {colors.map(color => (<button onClick={() => { pickColor(color) }} key={color}>{color}</button>))}
    </div>
  )
}

export default Card
