import React from 'react'
import Tile from './Tile'

const Board = ({ boardState }) => {
  return (
    <div id='Board'>
      {
        boardState.board.map(tile =>
          <Tile
            key={tile.pos}
            type={tile.type}
            piece={boardState.pieces.find(piece => piece.pos === tile.pos) ?
                   boardState.pieces.find(piece => piece.pos === tile.pos).player : ''}
          />
        )
      }
    </div>    
  )
}

export default Board