class Player {
  constructor (data) {
    const { id, name } = data
    this.id = id
    this.username = ''
    this.name = name
    this.cards = []
    this.isBot = false
    this.canDraw = true
    this.canPass = false
  }

  assignCards (cards) {
    this.cards = cards
  }

  removeCard (index) {
    this.cards.splice(index, 1)
  }

  addCard (card) {
    this.cards.push(card)
  }

  toggleDrawCard (state) {
    this.canDraw = state
  }

  togglePassTurn (state) {
    this.canPass = state
  }
}

export default Player
