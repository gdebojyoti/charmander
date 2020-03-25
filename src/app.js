import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import Game from 'pages/Game'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
