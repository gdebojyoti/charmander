export function getSearchParam (param) {
  if (!window.location.search) {
    return ''
  }

  const search = window.location.search.split('?')[1]
  const searchStrings = search.split('&')

  let value = ''
  searchStrings.forEach(searchString => {
    const params = searchString.split('=')
    if (params[0] === param) {
      value = params[1]
    }
  })

  return value
}

// Shuffle items of array | https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle (data) {
  const array = [...data]
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

// return details of player with current turn
export function getDetailsOfCurrentTurn (matchDetails) {
  if (!matchDetails) {
    return null
  }

  const current = matchDetails.players.find(({ id }) => matchDetails.currentTurn === id)
  return current
}
