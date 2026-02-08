import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  test('calls handleUsernameChange and handlePasswordChange when typing', async () => {
    const user = userEvent.setup()

    const handleUsernameChange = vi.fn()
    const handlePasswordChange = vi.fn()
    const handleSubmit = vi.fn()

    render(
      <LoginForm
        username=""
        password=""
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(usernameInput, 'mluukkai')
    await user.type(passwordInput, 'salainen')

    expect(handleUsernameChange).toHaveBeenCalled()
    expect(handlePasswordChange).toHaveBeenCalled()
  })

  test('calls handleSubmit when form is submitted', async () => {
    const user = userEvent.setup()

    const handleUsernameChange = vi.fn()
    const handlePasswordChange = vi.fn()
    const handleSubmit = vi.fn((e) => e.preventDefault())

    render(
      <LoginForm
        username="mluukkai"
        password="salainen"
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )

    const submitButton = screen.getByRole('button', { name: /log in/i })
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
