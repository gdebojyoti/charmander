// return array of card IDs in player's hand that are playable
export function getPlayableCards (hand, lastCardData) {
  const playableCards = []

  hand.forEach(({ name, type, id, color }) => {
    let isPlayable = false

    // same color
    if (color === lastCardData.color) {
      isPlayable = true
    }

    // in case of wild cards
    if (['WILD', 'WILD_DRAW_FOUR'].indexOf(name) > -1) {
      isPlayable = true
    }

    // same number or action ('REVERSE')
    if (name === lastCardData.name) {
      isPlayable = true
    }

    if (isPlayable) {
      playableCards.push(id)
    }
  })

  return playableCards
}
