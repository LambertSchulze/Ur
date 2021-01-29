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
      // find if piece is on the given tile
      const piece = state.pieces.find(p => p.pos === action.position)
      if (!piece) {
        console.log('no piece on tile')
        return
      }

      // is it time to move
      if (state.game.turn !== 'MOVE') {
        console.log('you have to roll first!')
        return
      }

      // is it the turn of the player of the piece 
      if (piece.player !== state.game.activePlayerIndex) {
        console.log('this is not your piece')
        return
      }

      // on which tile would the piece land with the roll
      const targetTile = state.game.movement[state.game.activePlayerIndex][state.game.roll.sum]
      console.log('this piece would land on tile ' + targetTile)

      // is that move legal
      const targetPiece = state.piece.find(p => p.pos === targetTile)
      if (targetTile === undefined ||       // piece goes further than finish
          targetPiece.player === state.game.activePlayerIndex) { // tile already taken by own piece
        console.log('ilegal move')
        return
      }

      /* if everything is ok and the move can take place, create the new state in little bits:
      - create the new state.game depending on if player gets extra roll
      - create new player state depending on if a piece is in goal or got captured
      - create new array of pieces depending on the 3 possibilities

      // is the piece in finish
      if (targetTile === 'finish') {
        const newPlayersState = state.players
        newPlayersState[state.game.activePlayerIndex].finish++

        if (newPlayersState[state.game.activePlayerIndex].finish > 4) console.log('GAME END')

        return {
          ...state,
          pieces: state.pieces.map(p => p.pos !== action.position),
          players: newPlayersState,
          game: {
            ...state.game,
            activePlayerIndex: nextPlayer(state.game.activePlayerIndex),
            turn: 'ROLL'
          }
        }
      }

      // does the piece capture an opponents piece
      if (targetPiece.player === nextPlayer(state.game.activePlayerIndex)) {
        const newPlayersState = state.players
        newPlayersState[nextPlayer(state.game.activePlayerIndex)].hand++

        return {
          ...state,
          pieces: [...state.pieces.map(p => p.pos !== action.position), {pos: targetTile, player: nextPlayer(state.game.activePlayerIndex)}],
          players: newPlayersState,
          game: {
            ...state.game,
            activePlayerIndex: isTileExtraRoll(state.board, targetTile) ? state.game.activePlayerIndex : nextPlayer(state.game.activePlayerIndex),
            turn: 'ROLL'
          }
        }
      }

      // does the player get a second turn

      // move piece

      /* normal move still TODO */

      break
      
    case 'DRAW_PIECE_FROM_HAND':
      const activePlayer = state.players[state.game.activePlayerIndex]
      const tileForNewPiece = state.game.movement[state.game.activePlayerIndex][state.game.roll.sum]

      if (action.playerID === state.game.activePlayerIndex &&
          state.game.turn === 'MOVE' &&
          activePlayer.hand > 0 &&
          findPieceOnTile(state.pieces, tileForNewPiece) === undefined) {

        const newPlayersState = state.players
        newPlayersState[state.game.activePlayerIndex].hand--

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
const nextPlayer = (activePlayer) => !activePlayer ? 1 : 0
const findPieceOnTile = (pieces, tile) => pieces.find(p => p.pos === tile)
const isTileExtraRoll = (board, tile) => board.find(t => t.pos === tile).type === 'extra'

/* Action creators */
export const makeNewGame =       () =>         {return {type: 'MAKE_NEW_GAME'}}
export const rollDice =          () =>         {return {type: 'ROLL_DICE'}}
export const movePiece =         (position) => {return {type: 'MOVE_PIECE', position: position}}
export const drawPieceFromHand = (playerID) => {return {type: 'DRAW_PIECE_FROM_HAND', playerID: playerID}}

export default gameReducer