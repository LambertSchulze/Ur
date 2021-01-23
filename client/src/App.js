import React from 'react'
import './style.css'
import MainMenu from './components/MainMenu'
import Board from './components/Board'
import { useSelector } from 'react-redux'

const App = () => {
  return (
    <div>
      <h1>The Game of Ur</h1>
      <MainMenu />
      <Board boardState={useSelector(state => state)} />
    </div>
  )
}

export default App