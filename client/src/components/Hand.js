import React from 'react'

const Hand = ({ player, turn }) => {
  return (
    <div id={'Hand' + player.color.toUpperCase()} className={turn === player.color ? 'active' : ''}>
      {player.color === 'white' ? '⚪' : '⚫'}: {player.hand}
    </div>
  )
}

export default Hand