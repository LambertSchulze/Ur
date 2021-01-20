import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Board from './Board'

test('renders css class names from cell state', () => {
  const cellState = {
    position: "1-1",
    stateAsClass: "cell flower empty"
  }
  
  const component = render(
    <Board state={cellState} />
  )
})