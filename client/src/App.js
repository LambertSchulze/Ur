import React from 'react'
import './style.css'
import Board from './components/Board'

const App = () => {
  const emptyGame = [
    {
      position: "1-1",
      stateAsClass: "cell flower empty"
    },
    {
      position: "1-2",
      stateAsClass: "cell empty"
    },
    {
      position: "1-3",
      stateAsClass: "cell empty"
    },
    {
      position: "1-4",
      stateAsClass: "cell empty"
    },
    {
      position: "1-5",
      stateAsClass: "none"
    },
    {
      position: "1-6",
      stateAsClass: "none"
    },
    {
      position: "1-7",
      stateAsClass: "cell flower empty"
    },
    {
      position: "1-8",
      stateAsClass: "cell empty"
    },
    {
      position: "2-1",
      stateAsClass: "cell empty"
    },
    {
      position: "2-2",
      stateAsClass: "cell empty"
    },
    {
      position: "2-3",
      stateAsClass: "cell empty"
    },
    {
      position: "2-4",
      stateAsClass: "cell flower empty"
    },
    {
      position: "2-5",
      stateAsClass: "cell empty"
    },
    {
      position: "2-6",
      stateAsClass: "cell empty"
    },
    {
      position: "2-7",
      stateAsClass: "cell empty"
    },
    {
      position: "2-8",
      stateAsClass: "cell empty"
    },
    {
      position: "3-1",
      stateAsClass: "cell flower empty"
    },
    {
      position: "3-2",
      stateAsClass: "cell empty"
    },
    {
      position: "3-3",
      stateAsClass: "cell empty"
    },
    {
      position: "3-4",
      stateAsClass: "cell empty"
    },
    {
      position: "3-5",
      stateAsClass: "none"
    },
    {
      position: "3-6",
      stateAsClass: "none"
    },
    {
      position: "3-7",
      stateAsClass: "cell flower empty"
    },
    {
      position: "3-8",
      stateAsClass: "cell empty"
    }
  ]

  return (
    <div>
      <h1>The Game of Ur</h1>
      <Board state={emptyGame}/>
    </div>
  )
}

export default App