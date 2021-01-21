import React from 'react'
import './style.css'
import MainMenu from './components/MainMenu'

const App = () => {
  const boardLayout = {
    11: {
      type: 'flower'
    },
    12: {
      type: 'normal'
    },
    13: {
      type: 'normal'
    },
    14: {
      type: 'normal'
    },
    15: {},
    16: {},
    17: {
      type: 'flower'
    },
    18: {
      type: 'normal'
    },
    21: {
      type: 'normal'
    },
    22: {
      type: 'normal'
    },
    23: {
      type: 'normal'
    },
    24: {
      type: 'flower'
    },
    25: {
      type: 'normal'
    },
    26: {
      type: 'normal'
    },
    27: {
      type: 'normal'
    },
    28: {
      type: 'normal'
    },
    31: {
      type: 'flower'
    },
    32: {
      type: 'normal'
    },
    33: {
      type: 'normal'
    },
    34: {
      type: 'normal'
    },
    35: {},
    36: {},
    37: {
      type: 'flower'
    },
    38: {
      type: 'normal'
    }
  }

  return (
    <div>
      <h1>The Game of Ur</h1>
      <MainMenu />
    </div>
  )
}

export default App