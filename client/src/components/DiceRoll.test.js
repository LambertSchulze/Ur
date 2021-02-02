import React from 'react'
import { useDispatch } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import DiceRoll from './DiceRoll'

test('Empty Array displays empty div', () => {
  const component = render(<DiceRoll roll={[]} />)

  expect(component.container).toHaveTextContent('')
})