class Card {
  constructor () {
    console.log('creating new card')

    this.type = '' // 'NUMBER', 'ACTION'
    this.value = '' // 9, 0, 'DRAW_TWO', 'WILD_DRAW_FOUR', 'SKIP', 'REVERSE'
    this.color = '' // one of the 4 colors or 'WILD'; eg: 'RED'
  }
}

export default Card
