
import { combineReducers } from 'redux'

import match from 'reducers/matchReducer'
import network from 'reducers/networkReducer'
import profile from 'reducers/profileReducer'
import message from 'reducers/messageReducer'

const rootReducer = combineReducers({
  match,
  network,
  profile,
  message
})

export default rootReducer
