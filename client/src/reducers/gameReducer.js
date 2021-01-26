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
  players: [
    {
      hand: 0,
      finish: 0,
      color: 'white'
    },
    {
      hand: 0,
      finish: 0,
      color: 'black'
    }
  ],
  game: {
    activePlayer: 0,
    turn: 'ROLL',
    roll: {
      dice: [0, 0, 0, 0],
      sum: 0
    }
  }
}

const gameReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'MAKE_NEW_GAME':
      return {
        ...INITIAL_STATE,
        players: [
          {
            ...INITIAL_STATE.players[0],
            hand: 5
          },
          {
            ...INITIAL_STATE.players[1],
            hand: 5
          }
        ],
        game: {
          ...INITIAL_STATE.game
        }
      }
    case 'ROLL_DICE':
      let roll = [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())]
      let sum = roll.reduce((a, b) => {return a + b})
      return {
        ...state,
        game: {
          activePlayer: sum > 0 ? state.game.activePlayer : nextPlayer(state.game.activePlayer),
          turn: sum > 0 ? 'MOVE' : 'ROLL',
          roll: {
            dice: roll,
            sum: sum
          }
        }
      }
    case 'MOVE_PIECE':
      const pieceToMove = state.pieces.find(p => p.pos === action.piece.pos)
      const movedPiece = {
        ...pieceToMove,
        pos: action.tile
      }
      return {
        ...state,
        pieces: state.pieces.map(p => p !== pieceToMove ? p : movedPiece)
      }
    case 'DRAW_PIECE_FROM_HAND':
      if (state.players[state.game.activePlayer].hand > 0 && state.game.turn === 'MOVE') {
        const updatedPlayers = state.players
        updatedPlayers[state.game.activePlayer].hand -= 1

        return {
          ...state,
          pieces: [
            ...state.pieces,
            {
              pos: 14,
              player: state.game.activePlayer
            }
          ],
          players: updatedPlayers,
          game: {
            ...state.game,
            activePlayer: nextPlayer(state.game.activePlayer),
            turn: 'ROLL'
          }
        }
      }
      else {
        return state
      }
    default:
      return state
  }
}

/* Helpers */
const nextPlayer = (activePlayer) => activePlayer === 1 ? 0 : 1

/* Action creators */
export const makeNewGame =       () =>      {return {type: 'MAKE_NEW_GAME'}}
export const rollDice =          () =>      {return {type: 'ROLL_DICE'}}
export const movePiece =         (piece) => {return {type: 'MOVE_PIECE', piece: piece}}
export const drawPieceFromHand = () =>      {return {type: 'DRAW_PIECE_FROM_HAND'}}

export default gameReducer