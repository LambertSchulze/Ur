import React from 'react'
import './style.css'
import MainMenu from './components/MainMenu'
import Board from './components/Board'
import Hand from './components/Hand'
import { useSelector } from 'react-redux'

const App = () => {
  return (
    <div>
      <h1>The Game of Ur</h1>
      <MainMenu />
      <Hand player={useSelector(state => state.player1)} />
      <Board boardState={useSelector(state => state)} />
      <Hand player={useSelector(state => state.player2)} />
    </div>
  )
}

export default App