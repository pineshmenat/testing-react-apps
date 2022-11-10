// form testing
// http://localhost:3000/login

import * as React from 'react'
import {getByRole, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import faker, {internet} from 'faker'
import {build, oneOf, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`

  // function buildLoginForm(overrides) {
  //   return {
  //     username: faker.internet.userName(),
  //     password: faker.internet.password(),
  //     ...overrides,
  //   }
  // }

  const userBuilder = build({
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  const {username, password} = userBuilder()
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  //
  // 🐨 click on the button with the text "Submit"
  const submit = screen.getByRole('button', {name: /submit/i})
  await userEvent.click(submit)

  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
