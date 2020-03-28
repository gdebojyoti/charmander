
import { combineReducers } from 'redux'

import network from 'reducers/networkReducer'
import profile from 'reducers/profileReducer'

const rootReducer = combineReducers({
  network,
  profile
})

export default rootReducer
