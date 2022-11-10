// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  act(() => {
    createRoot(div).render(<Counter />)
  })
  // console.log(document.body.innerHTML)
  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  const messageDiv = div.firstChild.querySelector('div')
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(messageDiv.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 act(() => increment.click()))
  act(() => increment.click())
  expect(messageDiv.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  act(() => decrement.click())
  // 🐨 assert the message.textContent
  expect(messageDiv.textContent).toBe('Current count: 0')
  div.remove()
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)
  //
  // 🐨 use createRoot to render the <Counter /> to the div
  act(() => {
    createRoot(div).render(<Counter />)
  })
  // console.log(document.body.innerHTML)
  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  const messageDiv = div.firstChild.querySelector('div')
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(messageDiv.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 act(() => increment.click()))
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  act(() => increment.dispatchEvent(incrementClickEvent))
  expect(messageDiv.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  act(() => decrement.dispatchEvent(decrementClickEvent))
  // 🐨 assert the message.textContent
  expect(messageDiv.textContent).toBe('Current count: 0')
  div.remove()
})

/* eslint no-unused-vars:0 */
