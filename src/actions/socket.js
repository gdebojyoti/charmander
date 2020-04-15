import openSocket from 'socket.io-client'

import { getSearchParam } from 'utilities/general'
import { setValue } from 'utilities/localStorage'
import matchStatus from 'constants/matchStatus'
import networkStatus from 'constants/networkStatus'

// use heroku link only on production ("prod=true" in URL) only
// const remoteUrl = window.location.search.indexOf('prod') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`
const remoteUrl = window.location.host.indexOf('uno') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`

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

      // rejoin match once user re-connects after getting disconnected
      const {
        match: { id: matchId } = {},
        profile: { username } = {}
      } = getState()
      if (matchId && username) {
        console.log('trying to rejoin...', matchId, username)
        socket.emit('REJOIN_MATCH', { username, matchId })
      }
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
    socket.on('MATCH_HOSTED', ({ id: matchId, code }) => {
      console.log('Hosted new match', matchId)
      // update match ID in local storage
      setValue('matchId', matchId)

      const {
        profile: { name, username } = {}
      } = getState()

      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: {
          id: matchId,
          code,
          status: matchStatus.PREMATCH,
          players: [{ name, username }],
          host: username
        }
      })
    })

    // when current player (client) has joined
    socket.on('MATCH_JOINED', matchDetails => {
      console.log('Joined match', matchDetails)
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
      setValue('matchId', matchDetails.id)
    })

    // when no match with matchId is found
    socket.on('MATCH_JOIN_FAILED', () => {
      console.warn('Could not join match')
      setValue('matchId', null)

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: 'Could not join match'
        }
      })
    })

    // TODO: optimize payload
    // when a new player joins
    socket.on('PLAYER_JOINED', matchDetails => {
      console.log('new player joined', matchDetails)
      // update list of all players
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })

    // when match start fails
    socket.on('MATCH_START_FAILED', reason => {
      console.warn('Could not start match', reason)

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: 'Could not start match'
        }
      })
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

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: 'Could not rejoin match'
        }
      })
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

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: `Cannot play that card: ${reason}`
        }
      })
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
    socket.on('GAME_OVER', () => {
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: {
          status: matchStatus.COMPLETED
        }
      })
    })

    // player left
    socket.on('PLAYER_LEFT', ({ match: matchDetails, username }) => {
      const {
        match: { players = [] } = {}
      } = getState()

      const player = players.find(player => player.username === username)
      if (!player) {
        return
      }

      const { name = 'A player' } = player

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: `${name} has left the match`
        }
      })

      // TODO: Update only necessary fields; do client-side parsing
      dispatch({
        type: 'UPDATE_MATCH_DETAILS',
        payload: matchDetails
      })
    })
  }
}

export const hostMatch = ({ username, name }) => {
  return () => {
    socket.emit('HOST_MATCH', { username, name })
  }
}

export const joinMatch = ({ username, name, code }) => {
  return () => {
    socket.emit('JOIN_MATCH', { code, username, name })
  }
}

export const startMatch = ({ matchId }) => {
  return (dispatch, getState) => {
    console.log('matchId start', matchId)
    socket.emit('START_MATCH', { matchId, dev: getSearchParam('dev') === 'true' })
  }
}

export const restartMatch = () => {
  return (dispatch, getState) => {
    const { match: { id: matchId }, profile: { name, username } } = getState()
    console.log('restarting...', matchId)
    socket.emit('REMATCH', { matchId, name, username })
  }
}

export const rejoinMatch = ({ username, matchId }) => {
  return (dispatch, getState) => {
    socket.emit('REJOIN_MATCH', { username, matchId })
  }
}

export const selectCard = (id, options) => {
  return (dispatch, getState) => {
    socket.emit('SELECT_CARD', { id, options })
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

export const leaveMatch = () => {
  return (dispatch, getState) => {
    const { match: { id: matchId } } = getState()
    socket.emit('LEAVE_MATCH', matchId)

    setValue('matchId', null)
    window.location.href = '/'
  }
}
