import React from 'react'
import { useDispatch } from 'react-redux'
import { drawPieceFromHand } from './../reducers/gameReducer'

const Hand = ({ playerID, player, turn, activePlayerIndex }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (turn === 'MOVE') {
      dispatch(drawPieceFromHand())
    }
  }

  return (
    <div id={'Hand' + playerID}
         className={activePlayerIndex === playerID ? 'active' : ''}
         onClick={handleClick}>
      {player.color === 'white' ? '⚪' : '⚫'}: {player.hand}
    </div>
  )
}

export default Hand