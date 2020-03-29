
import { combineReducers } from 'redux'

import match from 'reducers/matchReducer'
import network from 'reducers/networkReducer'
import profile from 'reducers/profileReducer'

const rootReducer = combineReducers({
  match,
  network,
  profile
})

export default rootReducer
