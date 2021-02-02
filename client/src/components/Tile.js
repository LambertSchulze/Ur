import React from 'react'
import { useDispatch } from 'react-redux'
import { movePiece } from './../reducers/gameReducer'

const Tile = ({ position, type, piece }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(movePiece(position))
  }

  return (
    <div className={type} onClick={handleClick}>
      {piece}
    </div>
  )
}

export default Tile