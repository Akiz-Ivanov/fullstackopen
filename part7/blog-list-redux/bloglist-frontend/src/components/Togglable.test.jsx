import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { createRef } from 'react'

describe('<Togglable /> tests', () => {

  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div>
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('initially children are not displayed', async () => {
    const childrenDiv = await container.querySelector('.togglable-div')
    expect(childrenDiv).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const childrenDiv = await container.querySelector('.togglable-div')
    expect(childrenDiv).toBeVisible()
  })

  test('content can be closed', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const childrenDiv = await container.querySelector('.togglable-div')
    expect(childrenDiv).toBeVisible()

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    expect(childrenDiv).not.toBeVisible()
  })

  test('toggleVisibility method via ref works', async () => {
    const ref = createRef()

    container = render(
      <Togglable buttonLabel="show" ref={ref}>
        <div>togglable content</div>
      </Togglable>
    ).container

    const childrenDiv = await container.querySelector('.togglable-div')
    expect(childrenDiv).not.toBeVisible()

    await act(async () => {
      ref.current.toggleVisibility()
    })
    await waitFor(() => expect(childrenDiv).toBeVisible())

    await act(async () => {
      ref.current.toggleVisibility()
    })
    await waitFor(() => expect(childrenDiv).not.toBeVisible())
  })

})