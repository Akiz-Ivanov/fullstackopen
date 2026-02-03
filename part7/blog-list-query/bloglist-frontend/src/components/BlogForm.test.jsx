import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const button = screen.getByText('create')

  await user.type(titleInput, 'How to test React components')
  await user.type(authorInput, 'Test Master')
  await user.type(urlInput, 'https://blog.test.com')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('How to test React components')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Master')
  expect(createBlog.mock.calls[0][0].url).toBe('https://blog.test.com')
})