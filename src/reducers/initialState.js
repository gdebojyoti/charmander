// import matchStatus from 'constants/matchStatus'
import networkStatus from 'constants/networkStatus'

window.__INITIALSTATE__ = {
  players: {},
  cells: {},
  profile: {
    username: '',
    name: ''
  },
  match: {
    id: null,
    code: '', // shareable code for others to join
    status: '',
    players: [],
    currentTurn: '',
    host: '',
    discardPile: [],
    order: [],
    isReversed: false,
    lastCardData: {},
    allCards: [] // list of all cards in game
  },
  network: {
    status: networkStatus.CONNECTED,
    errorMsg: ''
  },
  message: {
    type: '',
    text: ''
  }
}

export default window.__INITIALSTATE__
