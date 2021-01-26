import React from 'react'

const Tile = ({ type, piece }) => {
  return (
    <div className={type}>
      {piece ? (piece.player === 'white' ? '⚪' : '⚫') : ''}
    </div>
  )
}

export default Tile