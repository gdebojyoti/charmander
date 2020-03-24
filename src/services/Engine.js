import Match from 'models/Match'
import cards from 'data/cards'
// import { shuffle } from 'utilities/general'

const matches = []

class Engine {
  static initialize () {
    this.hostGame()
  }

  static hostGame () {
    const match = new Match({
      // id: new Date().getTime().toString().substr(-4)
      id: 31291
    })

    match.addHost({
      name: 'Harry'
    })

    matches.push(match)
  }

  static joinGame (matchId, name) {
    if (!matchId) {
      console.warn('Match ID is missing')
      return
    }

    const currentMatch = matches.find(match => match.id === matchId)
    if (!currentMatch) {
      console.warn(`No match found with specified ID: "${matchId}"`)
      return
    }

    currentMatch.addGuest({
      name
    })
  }

  static startMatch (matchId) {
    const currentMatch = this._getCurrentMatch(matchId)
    if (!currentMatch) {
      return
    }

    // check if status is PREMATCH
    if (currentMatch.status !== 'PREMATCH') {
      console.warn('Match is not in PREMATCH state')
      return
    }

    // Temp: add 2 extra players
    this.joinGame(matchId, 'Ron')
    this.joinGame(matchId, 'Hermione')

    // check if host ID matches

    // check if at least 2 players are there
    if (currentMatch.players.length < 2) {
      console.warn('At least 2 players are needed')
      return
    }

    // assign cards to players
    // currentMatch.assignCards(shuffle(cards))
    currentMatch.assignCards(cards)

    // start match
    currentMatch.start()

    // trigger message to all clients
    return currentMatch
  }

  static cardPlayed (matchId, index, options) {
    const currentMatch = this._getCurrentMatch(matchId)
    if (!currentMatch) {
      return
    }

    const isPlayed = currentMatch.cardPlayed(index, options)
    return isPlayed ? currentMatch : null
  }

  static drawCard (matchId) {
    const currentMatch = this._getCurrentMatch(matchId)
    if (!currentMatch) {
      return
    }

    currentMatch.drawCard()

    return currentMatch
  }

  static passTurn (matchId) {
    const currentMatch = this._getCurrentMatch(matchId)
    if (!currentMatch) {
      return
    }

    currentMatch.passTurn()

    return currentMatch
  }

  // private methods

  static _getCurrentMatch (matchId) {
    // exit if match ID is missing
    if (!matchId) {
      console.warn('Match ID is missing')
      return
    }

    // exit if match ID is invalid
    const currentMatch = matches.find(match => match.id === matchId)
    if (!currentMatch) {
      console.warn(`No match found with specified ID: "${matchId}"`)
      return
    }

    return currentMatch
  }
}

export default Engine
