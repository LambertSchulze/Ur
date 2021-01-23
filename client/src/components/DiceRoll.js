import React from 'react'

const DiceRoll = ({ roll }) => {
  let dice1, dice2, dice3, dice4
  
  if (roll.length === 4) {
    dice1 = roll[0] === 1 ? 1 : 0
    dice2 = roll[1] === 1 ? 1 : 0
    dice3 = roll[2] === 1 ? 1 : 0
    dice4 = roll[3] === 1 ? 1 : 0
  }
  else dice1 = dice2 = dice3 = dice4 = ''

  return (
    <div id="DiceRoll">{dice1 + ' ' + dice2 + ' ' + dice3 + ' ' + dice4}</div>
  )
}

export default DiceRoll