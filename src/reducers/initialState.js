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
    cards: [] // player's cards
  },
  network: {
    status: networkStatus.CONNECTED,
    errorMsg: ''
  }
}

export default window.__INITIALSTATE__
