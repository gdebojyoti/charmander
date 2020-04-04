import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import Game from 'pages/Uno'

import 'stylesheets/main'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <div className='device'>
        <Game />
      </div>
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
