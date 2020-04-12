import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import PlayerCard from 'components/PlayerCard'
import DrawCard from 'components/DrawCard'
import DiscardPile from 'components/DiscardPile'
import PlayerHand from 'components/PlayerHand'
import DrawnCard from 'components/DrawnCard'
import ColorPicker from 'components/ColorPicker'
import Button from 'components/Ui/Button'

import './style'

const Arena = (props) => {
  const { socketActions, match, profile, dispatch } = props
  const { players, status, currentTurn, lastCardData, isReversed } = match

  const [discardPile, setDiscardPile] = useState([])
  const [indexForWildCard, setIndexForWildCard] = useState(-1)

  useEffect(() => {
    console.log('change lastCardData', lastCardData)
    setDiscardPile([...discardPile, lastCardData])
  }, [lastCardData])

  const client = players.find(player => player.username === profile.username) || {}
  const opponents = players.filter(player => player.username !== profile.username) || []

  const isClientsTurn = client.username === currentTurn

  const playerDetailsClass = `player-details ${isClientsTurn ? 'player-details--active' : ''}`

  const onCardSelect = (index) => {
    if (!isClientsTurn) {
      console.warn('Invalid turn')
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'WARNING',
          text: 'Wait for your turn'
        }
      })
      return
    }

    const card = client.cards[index]
    console.log('card selected', card)

    if (['WILD_DRAW_FOUR', 'WILD'].indexOf(card.name) > -1) {
      setIndexForWildCard(index)
      return
    }

    socketActions.selectCard(index)
  }

  // when user clicks on draw stack
  const onDraw = () => {
    socketActions.drawCard()
  }

  // when user keeps card drawn from draw stack
  const onKeepDrawnCard = () => {
    socketActions.passTurn()
  }

  // when user plays card drawn from draw stack
  const onPlayDrawnCard = () => {
    // TODO: Client side validation; skip option to play card if card drawn is invalid
    onCardSelect(client.cards.length - 1)
  }

  // when user chooses color after selecting wild card
  const onPlayWildCard = (color) => {
    socketActions.selectCard(indexForWildCard, { color })
    // close color picker
    setIndexForWildCard(-1)
  }

  console.log('lastCardData', lastCardData)
  console.log('client', client)
  console.log('opponents', opponents)
  console.log('discardPile', discardPile)

  return (
    <div className='arena'>
      {/* leave game button */}
      {/* TODO: Fix leave game button (avoid using negative scale) */}
      {/* TODO: Show confirmation dialog */}
      <Button onClick={() => socketActions.leaveMatch()}>&#10132;</Button>

      <Opponents data={opponents} currentTurn={currentTurn} />

      <div className='mid-section'>
        {/* TODO: Call socket method on click */}
        {isClientsTurn && <DrawCard onClick={onDraw} />}
        <DiscardPile data={discardPile} isReversed={isReversed} />
      </div>

      <div className={playerDetailsClass}>
        <PlayerCard data={{ ...client, name: 'You' }} />
      </div>

      <PlayerHand data={client.canPass ? client.cards.slice(0, client.cards.length - 1) : client.cards} onCardSelect={onCardSelect} />

      {client.canPass && (
        <DrawnCard
          data={client.cards[client.cards.length - 1]}
          onKeep={onKeepDrawnCard}
          onPlay={onPlayDrawnCard}
        />
      )}

      {indexForWildCard !== -1 && (
        <ColorPicker
          onClick={onPlayWildCard}
        />
      )}

      {status !== 'LIVE' && <div>Status: {status}</div>}
    </div>
  )
}

const Opponents = ({ data, currentTurn }) => {
  return (
    <div className='opponent-cards'>
      {data.map((opponent, index) => {
        return (
          <div className='opponent-card-wrapper' key={index}>
            <PlayerCard data={opponent} isTurn={currentTurn === opponent.username} disabled={index === 3} />
          </div>
        )
      })}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Arena)
