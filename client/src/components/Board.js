import React from 'react'
import Tile from './Tile'

const Board = ({ board, pieces }) => {
  const getPieceForTile = (tile) => {
    let piece = pieces.find(p => p.pos === tile.pos)
    if (!!piece) {
      return piece.player === 0 ? '⚪' : '⚫'
    } else {
      return ''
    }

  }

  return (
    <div id='Board'>
      {
        board.map(tile => {
          const pieceOnTile = getPieceForTile(tile)
          return (
            <Tile
              key={tile.pos}
              type={tile.type}
              piece={pieceOnTile}
            />)
        })
      }
    </div>    
  )
}

export default Board