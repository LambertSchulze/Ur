import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MainMenu from './MainMenu'

test('Main menu has a New Game button', () => {
  const component = render(<MainMenu />)

  expect(component.container.querySelector('button#NewGame')).toHaveTextContent('New Game')
})