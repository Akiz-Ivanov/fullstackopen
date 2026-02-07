import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogView from './BlogView'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('<BlogView /> testing', () => {

  const blog = {
    title: 'How to test React components',
    author: 'Test Master',
    url: 'https://blog.test.com',
    likes: 5,
    user: { name: 'TestUser' },
  }

  const user = { name: 'TestUser' }

  const handleLike = vi.fn()
  const handleDelete = vi.fn()

  const userSim = userEvent.setup()
  const queryClient = new QueryClient()

  let container

  beforeEach(() => {
    vi.clearAllMocks()
    container = render(
      <QueryClientProvider client={queryClient}>
        <BlogView
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDeleteBlog={handleDelete}
        />
      </QueryClientProvider>
    ).container
  })

  test('renders all blog details', async () => {

    expect(screen.getByText(/How to test React components/)).toBeDefined()
    expect(screen.getByText(/Test Master/)).toBeDefined()
    expect(screen.getByText('https://blog.test.com')).toBeDefined()
    expect(screen.getByText(/likes/)).toBeDefined()
    expect(screen.getByText('Like')).toBeDefined()
    expect(screen.getByText(`Added by ${blog.user.name}`)).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {

    const likeButton = screen.getByText('Like')
    await userSim.click(likeButton)
    await userSim.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })

  test('calls handleDeleteBlog when delete button is clicked', async () => {

    const deleteBtn = screen.getByText('Delete')
    await userSim.click(deleteBtn)

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith(blog.id)
  })

})