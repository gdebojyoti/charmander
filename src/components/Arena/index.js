import React, { useState, useEffect } from 'react'

import AnimatedCard from 'components/AnimatedCard'
import PlayerCard from 'components/PlayerCard'
import DrawCard from 'components/DrawCard'
import DiscardPile from 'components/DiscardPile'
import PlayerHand from 'components/PlayerHand'
import DrawnCard from 'components/DrawnCard'
import ColorPicker from 'components/ColorPicker'
import Button from 'components/Ui/Button'
import { getPlayableCards } from 'utilities/card'

import './style'

const Arena = (props) => {
  const { socketActions, match, profile } = props
  const { players, currentTurn, lastCardData, isReversed, allCards } = match

  const [discardPile, setDiscardPile] = useState([])
  const [idForWildCard, setIdForWildCard] = useState(-1)
  const [animatedCard, setAnimatedCard] = useState(null) // data for card to be animated (card ID, src element ID, dest element ID)

  // update discard pile if a new card is added to it (check by card ID)
  useEffect(() => {
    console.log('change lastCardData', lastCardData)
    setDiscardPile([...discardPile, lastCardData])
  }, [lastCardData.id])

  const client = players.find(player => player.username === profile.username) || {}
  const opponents = players.filter(player => player.username !== profile.username) || []

  // remove animated card layer when player's card stack is altered (i.e. msg from socket is received)
  useEffect(() => {
    setAnimatedCard(null)
  }, [client.cards.length])

  const isClientsTurn = client.username === currentTurn

  const playerDetailsClass = `player-details ${isClientsTurn ? 'player-details--active' : ''}`

  const onCardSelect = (id, shouldAnimate) => {
    // check if shouldAnimated is false (eg: when color is picked for wild card)
    if (shouldAnimate) {
      setAnimatedCard({
        id,
        src: `player-card-${id}`,
        dest: 'discard-pile-container'
      })
    }

    // trigger socket methods after .9s (allowing sufficient time for animations to be completed)
    setTimeout(() => {
      // find card that matches ID
      const card = client.cards.find(card => card.id === id)
      console.log('card selected', card, client.cards, id)

      // check if wild card is being played; if so, save card ID
      if (['WILD_DRAW_FOUR', 'WILD'].indexOf(card.name) > -1) {
        console.log('wild card', card)
        setIdForWildCard(id) // save card's ID for further use
        return
      }

      socketActions.selectCard(id)
    }, shouldAnimate ? 900 : 0)
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
  const onPlayDrawnCard = (id) => {
    // TODO: Client side validation; skip option to play card if card drawn is invalid
    onCardSelect(id)
  }

  // when user chooses color after selecting wild card
  const onPlayWildCard = (color) => {
    socketActions.selectCard(idForWildCard, { color })
    // close color picker
    setIdForWildCard(-1)
  }

  // cards in player's hand that can be played
  const playableCards = getPlayableCards(client.cards, lastCardData)

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
        {isClientsTurn && <DrawCard shouldFocus={!playableCards.length} onClick={onDraw} />}
        <DiscardPile data={discardPile} isReversed={isReversed} />
      </div>

      <div className={playerDetailsClass}>
        <PlayerCard data={{ ...client, name: 'You' }} />
      </div>

      <PlayerHand
        active={isClientsTurn}
        data={client.canPass ? client.cards.slice(0, client.cards.length - 1) : client.cards}
        onCardSelect={onCardSelect}
        playableCards={playableCards}
      />

      {client.canPass && (
        <DrawnCard
          data={client.cards[client.cards.length - 1]}
          onKeep={onKeepDrawnCard}
          onPlay={onPlayDrawnCard}
          playableCards={playableCards}
        />
      )}

      {animatedCard && (
        <AnimatedCard
          {...animatedCard} // id, src, dest
          cards={allCards}
          onComplete={() => setAnimatedCard(null)}
        />
      )}

      {idForWildCard !== -1 && (
        <ColorPicker
          onClick={onPlayWildCard}
        />
      )}
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

export default Arena
