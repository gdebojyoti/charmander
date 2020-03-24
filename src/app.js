import React from 'react'
import { render } from 'react-dom'

import Uno from 'components/Game'

const App = () => {
  return (
    <div>
      <h2>Uno!</h2>
      <Uno />
    </div>
  )
}

render(<App />, document.getElementById('app'))
