import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog with correct details when submitted', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Enter blog title')
    const authorInput = screen.getByPlaceholderText('Enter author name')
    const urlInput = screen.getByPlaceholderText('https://example.com')

    const submitButton = screen.getByRole('button', { name: /create/i })

    await user.type(titleInput, 'How to test React components')
    await user.type(authorInput, 'Test Master')
    await user.type(urlInput, 'https://blog.test.com')

    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)

    expect(createBlog).toHaveBeenCalledWith({
      title: 'How to test React components',
      author: 'Test Master',
      url: 'https://blog.test.com'
    })
  })

  test('clears input fields after submit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Enter blog title')
    const authorInput = screen.getByPlaceholderText('Enter author name')
    const urlInput = screen.getByPlaceholderText('https://example.com')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test author')
    await user.type(urlInput, 'https://test.com')

    await user.click(screen.getByRole('button', { name: /create/i }))

    expect(titleInput).toHaveValue('')
    expect(authorInput).toHaveValue('')
    expect(urlInput).toHaveValue('')
  })

})
