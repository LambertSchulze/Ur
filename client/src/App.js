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
      <DiceRoll roll={useSelector(state => state.game.roll)}
                turn={useSelector(state => state.game.turn)} />
      <Hand playerID={0}
            player={useSelector(state => state.players[0])}
            turn={useSelector(state => state.game.turn)}
            activePlayer={useSelector(state => state.game.activePlayer)}/>
      <Board board={useSelector(state => state.board)}
             pieces={useSelector(state => state.pieces)} />
      <Hand playerID={1}
            player={useSelector(state => state.players[1])}
            turn={useSelector(state => state.game.turn)}
            activePlayer={useSelector(state => state.game.activePlayer)}/>
    </div>
  )
}

export default App