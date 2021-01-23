import React from 'react'

const Tile = ({ type, piece }) => {
  return (
    <div className={type}>{piece}</div>
  )
}

export default Tile