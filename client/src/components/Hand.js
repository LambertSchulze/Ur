import React from 'react'

const Hand = ({ player }) => {
  return (
    <div id={'Hand' + player.color.toUpperCase()}>
      {player.color === 'white' ? '⚪' : '⚫'}: {player.hand}
    </div>
  )
}

export default Hand