import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getValue } from 'utilities/localStorage'
import EditProfile from 'components/EditProfile'
import HostOrClient from 'components/HostOrClient'
import * as socketActions from 'actions/socket'
import * as profileActions from 'actions/profile'
import Engine from 'services/Engine'
import PlayerCard from 'components/PlayerCard'
import Card from 'components/Card'
import { getDetailsOfCurrentTurn } from 'utilities/general'
import './style'

const Game = ({ socketActions, profileActions, profile }) => {
  const [isReady, setIsReady] = useState(false) // true, if name & username exist in local storage
  const [hostOrClient, setHostOrClient] = useState(0) // 0: none; 1: host; 2: client

  const [host, setHost] = useState(null)
  const [opponents, setOpponents] = useState([])
  const [matchDetails, setMatchDetails] = useState(null)

  useEffect(() => {
    socketActions.initialize()
  }, [])

  // set isReady to true, if name & username exist
  useEffect(() => {
    // check for username & name from local storage
    const { name = '', username = '' } = getValue('profile') || {}
    console.log('profileData', name, username)
    if (name && username) {
      setIsReady(true)
      profileActions.updateProfile({ name, username })

      // stuff
      const matchId = getValue('matchId')
      if (matchId) {
        socketActions.rejoinMatch({ username, matchId })
        console.error('in the middle of a game', matchId)
        console.log('in the middle of a game', matchId)
      }
    }
  }, [])

  // when isReady = true, open socket connection & host game
  useEffect(() => {
    if (hostOrClient) {
      const { username, name } = profile

      if (hostOrClient === 1) {
        socketActions.hostMatch({ username, name })
      } else if (hostOrClient === 2) {
        socketActions.joinMatch({ username, name })
      }

      Engine.initialize()
    }
  }, [hostOrClient])

  // if isReady = false, open edit profile form
  if (!isReady) {
    const onReady = (profileData) => {
      setIsReady(true)
      profileActions.updateProfile(profileData)
    }
    return <EditProfile onReady={onReady} />
  }

  // if hostOrClient is not set (0), open form to select host vs join (as a client)
  if (!hostOrClient) {
    const onSelection = (index) => {
      setHostOrClient(index)
    }
    return <HostOrClient onSelection={onSelection} />
  }

  const matchId = 31291

  const startMatch = () => {
    socketActions.startMatch({
      matchId
    })

    const matchDetails = Engine.startMatch(matchId)
    if (matchDetails) {
      const host = matchDetails.players.find(({ id }) => matchDetails.host === id)
      if (host) {
        setHost(host)
      }

      const opponents = matchDetails.players.filter(({ id }) => matchDetails.host !== id)
      setOpponents(opponents)

      if (host && opponents.length) {
        console.log('Starting match', matchDetails)
        setMatchDetails({ ...matchDetails })
      }
    }
  }

  const onCardSelect = (index, playerId, options) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    console.log('onCardSelect', index, playerId)
    const matchDetails = Engine.cardPlayed(matchId, index, options)

    if (matchDetails) {
      setMatchDetails({ ...matchDetails })
    }
  }

  const onTake = (playerId) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    const matchDetails = Engine.drawCard(matchId)

    if (matchDetails) {
      setMatchDetails({ ...matchDetails })
    }
  }

  const onPass = (playerId) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    const matchDetails = Engine.passTurn(matchId)

    if (matchDetails) {
      setMatchDetails({ ...matchDetails })
    }
  }

  const currentTurn = getDetailsOfCurrentTurn(matchDetails)
  // const lastCard = matchDetails ? matchDetails.discardPile.slice(-1)[0] : null
  const { lastCardData } = matchDetails || {}

  console.log('matchDetails', matchDetails)

  return (
    <div>
      <h2>Uno Game!</h2>

      {matchDetails && <div>Status: {matchDetails.status}</div>}
      {currentTurn && <div>Current turn: {currentTurn.name}</div>}

      {lastCardData && (
        <div className='discard-pile'>
          Discard pile
          <Card data={lastCardData} />
        </div>
      )}

      {host && <Player data={host} onCardSelect={onCardSelect} onTake={onTake} onPass={onPass} />}
      {!!opponents.length && <Opponents players={opponents} onCardSelect={onCardSelect} onTake={onTake} onPass={onPass} />}

      <DummyZone matchId={matchId} startMatch={startMatch} />
    </div>
  )
}

const Player = ({ data, ...rest }) => {
  console.log('player data', data)
  return (
    <section className='section player'>
      <h2>Player</h2>
      {data && <PlayerCard data={data} {...rest} />}
    </section>
  )
}

const Opponents = ({ players, ...rest }) => {
  console.log('opponents data', players)
  return (
    <section className='section opponents'>
      <h2>Opponents</h2>
      {players.map((data, index) => <PlayerCard data={data} {...rest} key={index} />)}
    </section>
  )
}

const DummyZone = ({ matchId, startMatch }) => {
  const [name, setName] = useState('')
  const addGuest = () => {
    Engine.joinGame(matchId, name)
    setName('')
  }

  return (
    <section className='section dummy-zone'>
      <input type='text' placeholder='Player name' value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addGuest}>Add Guest Player</button>

      <br />

      <button onClick={startMatch}>Start Match</button>
    </section>
  )
}

const mapStateToProps = ({
  profile,
  players,
  match: { id, status } = {}
}) => ({
  matchId: id,
  matchStatus: status,
  players,
  profile
})

const mapDispatchToProps = dispatch => {
  return {
    socketActions: bindActionCreators(socketActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
