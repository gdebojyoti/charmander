import React from 'react'

import BasicPage from 'components/Ui/BasicPage'
import Button from 'components/Ui/Button'

import './style'

const PostGame = ({ match: { players }, profile: { username } }) => {
  const result = computeScores(players)

  const didWin = result[0].username === username

  return (
    <BasicPage
      heading={didWin ? 'You won!' : 'You lost!'}
      subheading={didWin ? 'Winner Winner Chicken Dinner' : 'Better luck next time.'}
    >
      <div className='post-game'>
        {result.map((player, index) => {
          return (
            <PlayerTab data={player} key={index} />
          )
        })}

        <Button disabled>Rematch</Button>
      </div>
    </BasicPage>
  )
}

const PlayerTab = ({ data, isHost }) => {
  const { rank, name, score, img = 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png' } = data
  return (
    <div className='ranked-player'>
      <div className='ranked-player__rank' src={img}>{rank}</div>
      <img className='ranked-player__img' src={img} />
      <div className='ranked-player__name'>{name}</div>
      <div className='ranked-player__score'>{score}</div>
    </div>
  )
}

function computeScores (players) {
  // final value to be returned
  const result = []

  // store 'name' & 'username' fields; create 'score' from total value of remaining cards
  players.forEach(({ username, name, cards }) => {
    result.push({
      username,
      name,
      score: cards.reduce((total, card) => {
        return total + card.value
      }, 0)
    })
  })

  // calculate total possible score by adding scores of all players
  const total = result.reduce((total, { score }) => {
    return total + score
  }, 0)

  // compute actual score of each player; lower is better
  result.forEach(player => {
    player.score = total - player.score
  })

  // sort players in decreasing order of score
  result.sort((a, b) => {
    if (a.score < b.score) {
      return 1
    }
    if (a.score > b.score) {
      return -1
    }
    return 0
  })

  // assign ranks
  result.forEach((player, index) => {
    // assign rank 1 to first player
    if (!index) {
      player.rank = 1
      return
    }

    // get previous player
    const previous = result[index - 1]

    if (player.score === previous.score) {
      // assign same rank to subsequent player if scores are same
      player.rank = previous.rank
    } else {
      // else assign next rank to subsequent player
      player.rank = previous.rank + 1
    }
  })

  return result
}

export default PostGame
