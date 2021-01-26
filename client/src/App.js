import React from 'react'
import './style.css'
import MainMenu from './components/MainMenu'
import Board from './components/Board'
import Hand from './components/Hand'
import DiceRoll from './components/DiceRoll'
import { useSelector } from 'react-redux'

const App = () => {
  return (
    <div>
      <h1>The Game of Ur</h1>
      <MainMenu />
      <DiceRoll roll={useSelector(state => state.game.roll)} turn={useSelector(state => state.game.turn)} />
      <Hand player={useSelector(state => state.player1)} turn={useSelector(state => state.game.turn)}/>
      <Board board={useSelector(state => state.board)} pieces={useSelector(state => state.pieces)} />
      <Hand player={useSelector(state => state.player2)} turn={useSelector(state => state.game.turn)}/>
    </div>
  )
}

export default App