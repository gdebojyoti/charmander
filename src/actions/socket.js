import openSocket from 'socket.io-client'

import { setValue } from 'utilities/localStorage'
import networkStatus from 'constants/networkStatus'

// use heroku link only on production ("prod=true" in URL) only
// const remoteUrl = window.location.search.indexOf('prod') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`
const remoteUrl = window.location.host.indexOf('playludo') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`

const socket = openSocket(remoteUrl)

export const initialize = () => {
  return (dispatch, getState) => {
    socket.on('connect', () => {
      console.warn('connected', socket.id, socket.disconnected, socket)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.CONNECTED
        }
      })
      // console.log('rejoining...', matchId)
      // socket.emit('JOIN_MATCH', {
      //   username,
      //   matchId
      // })
    })

    socket.on('disconnect', (msg) => {
      console.warn('disconnected', msg)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.DISCONNECTED,
          msg
        }
      })
    })

    // socket.on('reconnect_attempt', (attemptNumber) => {
    //   console.warn('reconnect attempt...', attemptNumber)
    // })

    socket.on('reconnecting', (attemptNumber) => {
      console.warn('reconnecting...', attemptNumber)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.RECONNECTING
        }
      })
    })

    // socket.on('reconnect', (attemptNumber) => {
    //   console.warn('reconnected', attemptNumber)
    // })

    socket.on('reconnect_error', (error) => {
      console.warn('reconnection error', error)
    })

    socket.on('reconnect_failed', () => {
      console.warn('failed to reconnect')
    })

    // messages from server

    // when current player (client) has successfully hosted match
    socket.on('MATCH_HOSTED', matchId => {
      console.log('Hosted new match', matchId)
      // update match ID in local storage
      setValue('matchId', matchId)

      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: { id: matchId }
      })
    })

    // when current player (client) has joined
    socket.on('MATCH_JOINED', matchDetails => {
      console.log('Joined match', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when no match with matchId is found
    socket.on('MATCH_JOIN_FAILED', () => {
      console.warn('Could not join match')
      setValue('matchId', null)
    })

    // when a new player joins
    socket.on('PLAYER_JOINED', data => {
      console.log('new player joined', data)
      // // update list of all players
      // dispatch({
      //   type: 'PLAYER_JOINED',
      //   payload: data
      // })
    })

    // when match start fails
    socket.on('MATCH_START_FAILED', reason => {
      console.warn('Could not start match', reason)
    })

    // when match starts
    socket.on('MATCH_STARTED', matchDetails => {
      console.info('Match has started', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when a player leaves
    socket.on('PLAYER_LEFT', playerDetails => {
      console.log('a player has left', playerDetails)
    })

    // when user fails to rejoin match
    socket.on('MATCH_REJOIN_FAILED', () => {
      console.warn('Could not rejoin match')
      setValue('matchId', null)
    })

    // when user rejoins match
    socket.on('MATCH_REJOINED', matchDetails => {
      console.info('Rejoined match', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when invalid card is selected
    socket.on('CANNOT_PLAY_CARD', reason => {
      console.info('Cannot play card', reason)
    })

    // when a card is played
    socket.on('CARD_PLAYED', matchDetails => {
      console.info('Card played', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when a card is played
    socket.on('CARD_DRAWN', matchDetails => {
      console.info('Card drawn', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when a card is played
    socket.on('TURN_PASSED', matchDetails => {
      console.info('Turn passed', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // game over
    socket.on('GAME_OVER', ({ winner }) => {
      console.log(`Winner Winner Chicken Dinner! Congrats ${winner}`)
      window.alert(`Winner Winner Chicken Dinner! Congrats ${winner}`)
    })
  }
}

export const hostMatch = ({ username, name }) => {
  return () => {
    socket.emit('HOST_MATCH', { username, name })
  }
}

export const joinMatch = ({ username, name, matchId = 31291 }) => {
  return () => {
    socket.emit('JOIN_MATCH', { matchId, username, name })
  }
}

export const startMatch = ({ matchId }) => {
  return (dispatch, getState) => {
    console.log('matchId start', matchId)
    socket.emit('START_MATCH', { matchId })
  }
}

export const rejoinMatch = ({ username, matchId }) => {
  return (dispatch, getState) => {
    socket.emit('REJOIN_MATCH', { username, matchId })
  }
}

export const onSelectCard = card => {
  socket.emit('CARD_SELECTED', card)
}

export const selectCard = (index, options) => {
  return (dispatch, getState) => {
    socket.emit('SELECT_CARD', { index, options })
  }
}

export const drawCard = (data) => {
  return () => {
    socket.emit('DRAW_CARD', data)
  }
}

export const passTurn = (data) => {
  return () => {
    socket.emit('PASS_TURN', data)
  }
}
