// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, renderHook, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function CustomCounterExample(props) {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<CustomCounterExample />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const currentCount = screen.getByText(/count:/i)

  expect(currentCount).toHaveTextContent('Count: 0')
  await userEvent.click(increment)
  expect(currentCount).toHaveTextContent('Count: 1')
  await userEvent.click(decrement)
  expect(currentCount).toHaveTextContent('Count: 0')
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

test('test customhook using TestComponent without implementing everything', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment(1))
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement(1))
  expect(result.current.count).toBe(0)
})

test('allow customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 1}})
  expect(result.current.count).toBe(1)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

test('allow customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 5}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 5}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  rerender({step: 3})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

/* eslint no-unused-vars:0 */
