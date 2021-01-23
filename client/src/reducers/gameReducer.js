const BOARD_LAYOUT = [
  {pos: 11, type: 'flower'},
  {pos: 12, type: 'normal'},
  {pos: 13, type: 'normal'},
  {pos: 14, type: 'normal'},
  {pos: 15, type: 'none'},
  {pos: 16, type: 'none'},
  {pos: 17, type: 'flower'},
  {pos: 18, type: 'normal'},
  {pos: 21, type: 'normal'},
  {pos: 22, type: 'normal'},
  {pos: 23, type: 'normal'},
  {pos: 24, type: 'flower'},
  {pos: 25, type: 'normal'},
  {pos: 26, type: 'normal'},
  {pos: 27, type: 'normal'},
  {pos: 28, type: 'normal'},
  {pos: 31, type: 'flower'},
  {pos: 32, type: 'normal'},
  {pos: 33, type: 'normal'},
  {pos: 34, type: 'normal'},
  {pos: 35, type: 'none'},
  {pos: 36, type: 'none'},
  {pos: 37, type: 'flower'},
  {pos: 38, type: 'normal'}
]
const INITIAL_STATE = {
  board: BOARD_LAYOUT,
  pieces: [],
  player1: {
    hand: 5,
    finish: 0,
    color: 'white'
  },
  player2: {
    hand: 5,
    finish: 0,
    color: 'black'
  },
  game: {
    turn: 'player1',
    roll: []
  }
}

const gameReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'NEW_GAME':
      return INITIAL_STATE
    default:
      return state
  }
}

export const makeNewGame = () => {return {type: 'NEW_GAME'}}

export default gameReducer