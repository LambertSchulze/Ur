import React from 'react'
import { useDispatch } from 'react-redux'
import { newRoll } from './../reducers/gameReducer'

const DiceRoll = ({ roll }) => {
  const dispatch = useDispatch()

  const rollDice = () => {
    dispatch(newRoll())
  }

  return (
    <div id="DiceRoll" onClick={rollDice}>
      <ul>
        <li>{roll.dice[0]}</li>
        <li>{roll.dice[1]}</li>
        <li>{roll.dice[2]}</li>
        <li>{roll.dice[3]}</li>
        <li><em>{'= ' + roll.sum}</em></li>
      </ul>
    </div>
  )
}

export default DiceRoll