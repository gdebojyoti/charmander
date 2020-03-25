import openSocket from 'socket.io-client'

import { setValue } from 'utilities/localStorage'
import networkStatus from 'constants/networkStatus'

// use heroku link only on production ("prod=true" in URL) only
// const remoteUrl = window.location.search.indexOf('prod') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`
const remoteUrl = window.location.host.indexOf('playludo') >= 0 ? 'https://charmeleon.herokuapp.com/' : `http://${window.location.hostname}:3333`

const socket = openSocket(remoteUrl)

const initialize = ({ username: playerId, matchId }) => {
  return (dispatch, getState) => {
    // const { home } = getPlayerDetails()
    if (matchId) {
      console.log('joining...', matchId, typeof matchId)
      socket.emit('JOIN_MATCH', {
        playerId,
        matchId
      })
    } else {
      console.log('hosting...')
      socket.emit('HOST_MATCH', {
        playerId
      })
      dispatch({
        type: 'SET_AS_HOST'
      })
    }

    socket.on('connect', () => {
      console.warn('connected', socket.id, socket.disconnected, socket)
      dispatch({
        type: 'UPDATE_CONNECTION_STATUS',
        payload: {
          status: networkStatus.CONNECTED
        }
      })
      const { match: { id } } = getState()
      console.log('rejoining...', matchId)
      socket.emit('JOIN_MATCH', {
        playerId,
        matchId: id
      })
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

    // when current player (client) is set as host
    socket.on('SET_AS_HOST', () => {
      dispatch({
        type: 'SET_AS_HOST'
      })
    })

    // when current player (client) has joined
    socket.on('CLIENT_JOINED', ({ matchId }) => {
      // update match ID in local storage
      setValue('matchId', matchId)
    })

    // when no match with matchId is found
    socket.on('MATCH_NOT_FOUND', ({ matches }) => {
      console.log('Match not found! Existing ones:', matches)
      console.log('Joining a new one...')
      // setValue('matchId', null)
    })

    // when a new player joins
    socket.on('PLAYER_JOINED', data => {
      // update list of all players
      dispatch({
        type: 'PLAYER_JOINED',
        payload: data
      })
    })

    // when a player leaves
    socket.on('PLAYER_LEFT', playerDetails => {
      console.log('a player has left', playerDetails)
    })

    // update current turn
    socket.on('SET_NEXT_TURN', ({ playerId }) => {
      console.info('next turn belongs to:', playerId)
      dispatch({
        type: 'UPDATE_NEXT_TURN',
        payload: playerId
      })
      dispatch({
        type: 'UPDATE_LAST_ROLL',
        payload: null
      })
      dispatch({
        type: 'UPDATE_DICE_ROLLED',
        payload: false
      })
    })

    // game over
    socket.on('GAME_OVER', ({ winner }) => {
      console.log(`Winner Winner Chicken Dinner! Congrats ${winner}`)
      window.alert(`Winner Winner Chicken Dinner! Congrats ${winner}`)
    })
  }
}

const startMatch = () => {
  socket.emit('START_MATCH')
}

const onSelectCard = card => {
  socket.emit('CARD_SELECTED', card)
}

export {
  initialize,
  startMatch,
  onSelectCard
}
