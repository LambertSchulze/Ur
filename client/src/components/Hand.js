import React from 'react'

const Hand = ({ player }) => {
  return (
    <div id={'Hand' + player.color.toUpperCase()}>{player.color}: {player.hand}</div>
  )
}

export default Hand