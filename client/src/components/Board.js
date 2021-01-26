import React from 'react'
import Tile from './Tile'

const Board = ({ board, pieces }) => {
  return (
    <div id='Board'>
      {
        board.map(tile =>
          <Tile
            key={tile.pos}
            type={tile.type}
            piece={pieces.find(piece => piece.pos === tile.pos)}
          />
        )
      }
    </div>    
  )
}

export default Board