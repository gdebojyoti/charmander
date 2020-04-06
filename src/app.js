import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import Game from 'pages/Game'
import Toast from 'components/Ui/Toast'

import 'stylesheets/main'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <div className='device'>
        <Game />
        <Toast />
      </div>
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
