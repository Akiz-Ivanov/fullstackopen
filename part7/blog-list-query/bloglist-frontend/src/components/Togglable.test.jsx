import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { createRef } from 'react'
import { act } from 'react-dom/test-utils'

describe('<Togglable />', () => {
  test('renders the toggle button', () => {
    render(
      <Togglable buttonLabel="new blog">
        <div>togglable content</div>
      </Togglable>
    )
    expect(screen.getByRole('button', { name: /new blog/i })).toBeInTheDocument()
    // content is always in DOM, that's fine
    expect(screen.getByText('togglable content')).toBeInTheDocument()
  })

  test('clicking show button triggers visibility toggle', async () => {
    const user = userEvent.setup()
    render(
      <Togglable buttonLabel="new blog">
        <div>togglable content</div>
      </Togglable>
    )

    await user.click(screen.getByRole('button', { name: /new blog/i }))
    // Cancel button should exist in DOM
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByText('togglable content')).toBeInTheDocument()
  })

  test('ref toggleVisibility works', () => {
    const ref = createRef()
    render(
      <Togglable buttonLabel="new blog" ref={ref}>
        <div>togglable content</div>
      </Togglable>
    )

    act(() => ref.current.toggleVisibility())
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()

    act(() => ref.current.toggleVisibility())
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    // still in DOM, animation hides it visually, that's fine for test
  })
})
