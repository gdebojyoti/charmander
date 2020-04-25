import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import configureStore from 'store/configureStore'
import Game from 'pages/Game'
import About from 'pages/About'
import Join from 'pages/Join'
import Toast from 'components/Ui/Toast'

import 'stylesheets/main'

const store = configureStore()

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/:code' component={Join} />
      </Switch>
    </BrowserRouter>
  )
}

const Home = () => {
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
