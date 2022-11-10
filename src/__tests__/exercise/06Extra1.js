// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 19,
      longitude: 20,
    },
  }
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  // 🐨 now that setup is done, render the Location component itself
  //
  render(<Location />)
  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => setReturnValue([fakePosition]))
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays the error when geolocation fails', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const error = {
    message: 'Something went wrong',
  }
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  // 🐨 now that setup is done, render the Location component itself
  //
  render(<Location />)
  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => setReturnValue([, error]))
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByRole('alert')).toHaveTextContent(error.message)
})

/*
eslint
  no-unused-vars: "off",
*/
