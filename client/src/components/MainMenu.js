import React from 'react'
import { useDispatch } from 'react-redux'
import { makeNewGame } from './../reducers/gameReducer'

const MainMenu = () => {
  const dispatch = useDispatch()

  const startNewGame = (event) => {
    event.preventDefault()
    dispatch(makeNewGame())
  }

  return (
    <nav id='MainMenu'>
      <ul>
        <li><button id='NewGame' onClick={startNewGame}>New Game</button></li>
        <li><button id='GameRules'>How to play</button></li>
      </ul>
    </nav>
  )
}

export default MainMenu