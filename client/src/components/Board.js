import React from 'react'

const Board = ( {state} ) => {

  return (
    <div id='board'>
      {state.map(cell =>
        <div key={cell.position} className={cell.stateAsClass}></div>
      )}
    </div>
  )
}

export default Board