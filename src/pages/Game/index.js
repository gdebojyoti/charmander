import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import matchStatus from 'constants/matchStatus'
import { getValue } from 'utilities/localStorage'
import EditProfile from 'components/EditProfile'
import HostOrClient from 'components/HostOrClient'
import * as socketActions from 'actions/socket'
import * as profileActions from 'actions/profile'
import Engine from 'services/Engine'
import PlayerCard from 'components/PlayerCard'
import Card from 'components/Card'

import './style'

const Game = (props) => {
  const { match, profile, socketActions, profileActions } = props

  const [isReady, setIsReady] = useState(false) // true, if name & username exist in local storage
  const [showChoiceModal, setShowChoiceModal] = useState(true) // modal for user to choose between host & client

  const { id: matchId, players, status, currentTurn, lastCardData } = match
  // const currentTurn = getDetailsOfCurrentTurn(matchDetails)

  const host = players.find(player => player.username === match.host)
  const opponents = players.filter(player => player.username !== match.host)

  // connect to Socket server; retrieve profile data from local storage
  useEffect(() => {
    // connect to Socket server
    socketActions.initialize()

    // check for username & name from local storage
    const { name = '', username = '' } = getValue('profile') || {}

    // set isReady to true, if name & username exist
    if (name && username) {
      setIsReady(true)
      profileActions.updateProfile({ name, username })

      // stuff
      const matchId = getValue('matchId')
      if (matchId) {
        socketActions.rejoinMatch({ username, matchId })
        console.log('in the middle of a game', matchId)
      }
    }
  }, [])

  // TODO: find a better condition for hiding modal
  // no need for choice modal if status is already LIVE
  useEffect(() => {
    if (status === matchStatus.LIVE) {
      setShowChoiceModal(false)
    }
  }, [status])

  // if isReady = false, open edit profile form
  if (!isReady) {
    const onReady = (profileData) => {
      setIsReady(true)
      profileActions.updateProfile(profileData)
    }
    return <EditProfile onReady={onReady} />
  }

  // if showChoiceModal = true, open form to select host vs join (as a client)
  if (showChoiceModal) {
    const onSelection = (index) => {
      const { username, name } = profile

      if (index === 1) {
        socketActions.hostMatch({ username, name })
      } else if (index === 2) {
        socketActions.joinMatch({ username, name, matchId })
      }

      setShowChoiceModal(false)
    }
    return <HostOrClient onSelection={onSelection} />
  }

  const startMatch = () => {
    socketActions.startMatch({
      matchId
    })
  }

  const onCardSelect = (index, playerId, options) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    console.log('onCardSelect options', options)
    socketActions.selectCard(index, options)
  }

  const onTake = (playerId) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    socketActions.drawCard()
  }

  const onPass = (playerId) => {
    if (!currentTurn) {
      return
    }

    if (currentTurn.id !== playerId) {
      console.warn('Invalid turn')
      return
    }

    socketActions.passTurn()
  }

  return (
    <div>
      <h2>Uno Game!</h2>

      <div>Status: {status}</div>
      <div>Current turn: {currentTurn}</div>

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
  match
}) => ({
  match,
  profile
})

const mapDispatchToProps = dispatch => {
  return {
    socketActions: bindActionCreators(socketActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
