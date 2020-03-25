import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'actions/socket'
import Engine from 'services/Engine'
import PlayerCard from 'components/PlayerCard'
import Card from 'components/Card'
import { getDetailsOfCurrentTurn } from 'utilities/general'
import './style'

const Game = ({ actions }) => {
  const [host, setHost] = useState(null)
  const [opponents, setOpponents] = useState([])
  const [matchDetails, setMatchDetails] = useState(null)

  useEffect(() => {
    Engine.initialize()
    actions.initialize({
      matchId: 31291,
      username: 'deb'
    })
  }, [])

  const matchId = 31291

  const startMatch = () => {
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

const mapStateToProps = ({ profile, players, match: { id, status } = {} }) => ({ matchId: id, matchStatus: status, players, profile })

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
