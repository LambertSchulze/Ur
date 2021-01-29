const BOARD_LAYOUT = [
  {pos: 11, type: 'extra'},
  {pos: 12, type: 'normal'},
  {pos: 13, type: 'normal'},
  {pos: 14, type: 'normal'},
  {pos: 15, type: 'none'},
  {pos: 16, type: 'none'},
  {pos: 17, type: 'extra'},
  {pos: 18, type: 'normal'},
  {pos: 21, type: 'normal'},
  {pos: 22, type: 'normal'},
  {pos: 23, type: 'normal'},
  {pos: 24, type: 'extra'},
  {pos: 25, type: 'normal'},
  {pos: 26, type: 'normal'},
  {pos: 27, type: 'normal'},
  {pos: 28, type: 'normal'},
  {pos: 31, type: 'extra'},
  {pos: 32, type: 'normal'},
  {pos: 33, type: 'normal'},
  {pos: 34, type: 'normal'},
  {pos: 35, type: 'none'},
  {pos: 36, type: 'none'},
  {pos: 37, type: 'extra'},
  {pos: 38, type: 'normal'}
]

const BOARD_PIECE_MOVEMENT = [
  [
    'hand', 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 18, 17, 'finish'
  ],
  [
    'hand', 34, 33, 32, 31, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 'finish'
  ]
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
    activePlayerIndex: -1,
    turn: '',
    roll: {
      dice: [0, 0, 0, 0],
      sum: 0
    },
    movement: BOARD_PIECE_MOVEMENT
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
          ...INITIAL_STATE.game,
          activePlayerIndex: 0,
          turn: 'ROLL'
        }
      }
    case 'ROLL_DICE':
      let roll = [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())]
      let sum = roll.reduce((a, b) => {return a + b})
      return {
        ...state,
        game: {
          ...state.game,
          activePlayerIndex: sum > 0 ? state.game.activePlayerIndex : nextPlayer(state.game.activePlayerIndex),
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
      const activePlayer = state.players[state.game.activePlayerIndex]
      const tileForNewPiece = state.game.movement[state.game.activePlayerIndex][state.game.roll.sum]

      if (state.game.turn === 'MOVE' &&
          activePlayer.hand > 0 &&
          findPieceOnTile(state.pieces, tileForNewPiece) === undefined) {

        const newPlayersState = state.players
        newPlayersState[state.game.activePlayerIndex].hand -= 1

        return {
          ...state,
          pieces: [
            ...state.pieces,
            {
              pos: tileForNewPiece,
              player: state.game.activePlayerIndex
            }
          ],
          players: newPlayersState,
          game: {
            ...state.game,
            activePlayerIndex: isTileExtraRoll(state.board, tileForNewPiece) ? state.game.activePlayerIndex : nextPlayer(state.game.activePlayerIndex),
            turn: 'ROLL'
          }
        }
      }
      return state
    default:
      return state
  }
}

/* Helpers */
const nextPlayer = (activePlayer) => activePlayer === 1 ? 0 : 1
const findPieceOnTile = (pieces, tile) => pieces.find(p => p.pos === tile)
const isTileExtraRoll = (board, tile) => board.find(t => t.pos === tile).type === 'extra'

/* Action creators */
export const makeNewGame =       () =>      {return {type: 'MAKE_NEW_GAME'}}
export const rollDice =          () =>      {return {type: 'ROLL_DICE'}}
export const movePiece =         (piece) => {return {type: 'MOVE_PIECE', piece: piece}}
export const drawPieceFromHand = () =>      {return {type: 'DRAW_PIECE_FROM_HAND'}}

export default gameReducer