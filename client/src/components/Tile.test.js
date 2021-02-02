import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Tile from './Tile'

test('piece gets rendered by tile', () => {
  const key = '11'
  const type = 'normal'
  const piece = {
    pos: '11',
    player: 'white'
  }

  const component = render(<Tile type={type} piece={piece} />)

  expect(component.container).toHaveTextContent('white')
})