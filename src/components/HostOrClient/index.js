import React from 'react'

const HostOrClient = ({ onSelection }) => {
  const choices = [
    {
      key: 1,
      text: 'Host'
    },
    {
      key: 2,
      text: 'Client'
    }
  ]
  return (
    <div>
      Choose: Host or Client?
      {choices.map(({ key, text }) => <button onClick={() => onSelection(key)} key={key}>{text}</button>)}
    </div>
  )
}

export default HostOrClient
