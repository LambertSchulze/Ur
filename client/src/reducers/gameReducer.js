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
      let sum = roll.reduce((a, b) => a + b)
      if (sum < 1) console.log('you rolled a 0')

      return {
        ...state,
        game: {
          ...state.game,
          activePlayerIndex: sum > 0 ? state.game.activePlayerIndex : nextPlayer(state),
          turn: sum > 0 ? 'MOVE' : 'ROLL',
          roll: {
            dice: roll,
            sum: sum
          }
        }
      }

    case 'MOVE_PIECE':
      // is it time to move?
      if (state.game.turn !== 'MOVE') {
        console.log('you have to roll first!')
        return state
      }

      const tileId = action.tileId
      const idOfTileInMovement = state.game.movement[state.game.activePlayerIndex].findIndex(e => e === tileId)
      const targetTileId = state.game.movement[state.game.activePlayerIndex][idOfTileInMovement + state.game.roll.sum]

      // case: piece lands on finish
      if (targetTileId === 'finish') {
        let newPlayersState = state.players
        newPlayersState[state.game.activePlayerIndex].finish++

        // check for game over
        if (state.players[0].finish === 5) {
          console.log('player ' + state.players[0].color + ' wins!')
          return INITIAL_STATE
        }
        else if (state.players[1].finish === 5) {
          console.log('player ' + state.players[1].color + ' wins!')
          return INITIAL_STATE
        }

        return {
          ...state,
          pieces: state.pieces.filter(p => p.pos !== tileId),
          players: newPlayersState,
          game: mapStateToNextPlayer(state)
        }
      }

      // out of bounds?
      if (targetTileId === undefined) {
        console.log('you have to get over the finish line with the right roll')
        return state
      }

      const piece = findPieceOnTile(state, tileId)

      // is there even a piece on the tile?
      if (!piece) {
        console.log('click on a piece you want to move')
        return state
      }

      // did active player click on his own piece?
      if (piece.player !== state.game.activePlayerIndex) {
        console.log('this is not your piece')
        return state
      }

      const pieceOnTarget = findPieceOnTile(state, targetTileId)

      // tile already taken by own piece?
      if (pieceOnTarget !== undefined && pieceOnTarget.player === state.game.activePlayerIndex) {
        console.log("you can't have two pieces on one tile")
        return state
      }

      // target tile is extra roll but tile is taken?
      if (isTileExtraRoll(state, targetTileId) && pieceOnTarget) {
        console.log('pieces on these tiles are safe')
        return state
      }

      // is there a possible move for the player?
      const playerPieces = state.pieces.filter(p => p.player === state.game.activePlayerIndex)
      playerPieces.push({pos: 'hand'})
      console.log(playerPieces)
      playerPieces.forEach(p => {
        const tileId = p.pos
        const idOfTileInMovement = state.game.movement[state.game.activePlayerIndex].findIndex(e => e === tileId)
        const targetTileId = state.game.movement[state.game.activePlayerIndex][idOfTileInMovement + state.game.roll.sum]
        const pieceOnTarget = findPieceOnTile(state, targetTileId)

        // is out of bounds?
        if (targetTileId === undefined) return
        // is own piece on tile?
        else if (pieceOnTarget !== undefined && pieceOnTarget.player === state.game.activePlayerIndex) return
        // is taken extra tile?
        else if (isTileExtraRoll(state, targetTileId) && pieceOnTarget) return
        // some move must be possible
        else return p
      })
      console.log('possible moves:')
      console.log(playerPieces)
      if (playerPieces.length < 1) {
        console.log('no possible moves')
        return {
          ...state,
          game: mapStateToNextPlayer(state)
        }
      }

      // update player hand if piece was captured
      let newPlayersState = state.players
      if (pieceOnTarget && pieceOnTarget.player === nextPlayer(state)) {
        newPlayersState[nextPlayer(state)].hand++
      }

      return {
        ...state,
        game: isTileExtraRoll(state, targetTileId) ? mapStateToSamePlayer(state) : mapStateToNextPlayer(state),
        pieces: [
          ...state.pieces.filter(p => p.pos !== tileId && p.pos !== targetTileId),
          {
            pos: targetTileId,
            player: state.game.activePlayerIndex
          }
        ],
        players: newPlayersState
      }

    case 'DRAW_PIECE_FROM_HAND':
      const activePlayer = state.players[state.game.activePlayerIndex]
      const tileForNewPiece = state.game.movement[state.game.activePlayerIndex][state.game.roll.sum]

      if (action.playerId === state.game.activePlayerIndex &&
          state.game.turn === 'MOVE' &&
          activePlayer.hand > 0 &&
          findPieceOnTile(state, tileForNewPiece) === undefined) {

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
          game: isTileExtraRoll(state, tileForNewPiece) ? mapStateToSamePlayer(state) : mapStateToNextPlayer(state)
        }
      }
      return state

    default:
      return state
  }
}

/* Helpers */
const nextPlayer = (state) => !state.game.activePlayerIndex ? 1 : 0
const findPieceOnTile = (state, tilePos) => state.pieces.find(p => p.pos === tilePos)
const isTileExtraRoll = (state, tilePos) => state.board.find(t => t.pos === tilePos).type === 'extra'
const mapStateToNextPlayer = (state) => {
  return {
    ...state.game,
    activePlayerIndex: nextPlayer(state),
    turn: 'ROLL',
  }
}
const mapStateToSamePlayer = (state) => {
  return {
    ...state.game,
    turn: 'ROLL'
  }
}

/* Action creators */
export const makeNewGame =       () =>         {return {type: 'MAKE_NEW_GAME'}}
export const rollDice =          () =>         {return {type: 'ROLL_DICE'}}
export const movePiece =         (tileId) =>   {return {type: 'MOVE_PIECE', tileId: tileId}}
export const drawPieceFromHand = (playerId) => {return {type: 'DRAW_PIECE_FROM_HAND', playerId: playerId}}

export default gameReducer