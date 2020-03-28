import matchStatus from 'constants/matchStatus'
import networkStatus from 'constants/networkStatus'

window.__INITIALSTATE__ = {
  players: {},
  cells: {},
  profile: {
    username: '',
    name: '',
    isHost: false
  },
  match: {
    id: null,
    status: matchStatus.PREMATCH,
    currentTurn: ''
  },
  network: {
    status: networkStatus.CONNECTED,
    errorMsg: ''
  }
}

export default window.__INITIALSTATE__
