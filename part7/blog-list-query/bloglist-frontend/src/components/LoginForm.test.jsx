import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('<LoginForm /> testing', () => {

  const handleUsernameChange = vi.fn()
  const handlePasswordChange = vi.fn()
  const handleSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <LoginForm
        username=''
        password=''
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )
  })

  test('input change handlers get called when user is typing', async () => {
    const user = userEvent.setup()

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')

    await user.type(usernameInput, 'mluukkai')
    await user.type(passwordInput, 'salainen')

    expect(handleUsernameChange).toHaveBeenCalledTimes(8)
    expect(handlePasswordChange).toHaveBeenCalledTimes(8)
  })

  test('calls the form event handler with the right details when submitted', async () => {
    const user = userEvent.setup()

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByText('log in')

    await user.type(usernameInput, 'mluukkai')
    await user.type(passwordInput, 'salainen')
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})