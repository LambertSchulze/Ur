import React from 'react'
import { useDispatch } from 'react-redux'
import { movePiece } from './../reducers/gameReducer'

const Hand = ({ player, turn }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (turn.includes(player.color)) {
      dispatch(movePiece({pos: 0, player: player.color}, 11))
    }
  }

  return (
    <div id={'Hand' + player.color.toUpperCase()}
         className={turn.includes(player.color) ? 'active' : ''}
         onClick={handleClick}>
      {player.color === 'white' ? '⚪' : '⚫'}: {player.hand}
    </div>
  )
}

export default Hand