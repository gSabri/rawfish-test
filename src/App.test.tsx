import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders header title', () => {
  render(<App />)
  const titleElement = screen.getByText(/pokèmon/i)
  expect(titleElement).toBeInTheDocument()
})