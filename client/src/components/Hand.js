import React from 'react'

const Hand = ({ player }) => {
  return (
    <div>{player.color}: {player.hand}</div>
  )
}

export default Hand