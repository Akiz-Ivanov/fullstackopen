import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> testing', () => {

  const blog = {
    title: 'How to test React components',
    author: 'Test Master',
    url: 'https://blog.test.com',
    likes: 5,
    user: { name: 'TestUser' },
  }

  const user = 'TestUser'

  const handleLike = vi.fn()
  const handleDelete = vi.fn()

  let container

  beforeEach(() => {
    vi.clearAllMocks()
    container = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={handleLike}
        handleDeleteBlog={handleDelete}
      />
    ).container
  })

  test('renders title and author but not url or likes by default', () => {
    expect(screen.getByText(/How to test React components/)).toBeDefined()
    expect(screen.getByText(/Test Master/)).toBeDefined()

    const div = container.querySelector('.details')
    expect(div).toBeNull()
  })

  test('renders blog URL and number of likes when show button is clicked', async () => {
    const userSim = userEvent.setup()
    const button = screen.getByText('view')
    await userSim.click(button)

    const div = container.querySelector('.details')
    expect(div).toBeDefined()

    expect(screen.getByText('https://blog.test.com')).toBeDefined()
    expect(screen.getByText(/likes/)).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const userSim = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userSim.click(viewButton)

    const likeButton = screen.getByText('Like')
    await userSim.click(likeButton)
    await userSim.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })

  test('calls handleDeleteBlog when delete button is clicked', async () => {
    const userSim = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await userSim.click(viewBtn)

    const deleteBtn = screen.getByText('delete')
    await userSim.click(deleteBtn)

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith(blog.id)
  })
})