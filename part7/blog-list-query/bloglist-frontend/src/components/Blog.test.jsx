import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> testing', () => {

  const blog = {
    title: 'How to test React components',
    author: 'Test Master',
    url: 'https://blog.test.com',
    likes: 5,
    user: { name: 'TestUser' },
  }

  let container

  beforeEach(() => {
    vi.clearAllMocks()
    container = render(
      <Blog
        blog={blog}
      />
    ).container
  })

  test('renders title, author, number of likes and comments', () => {
    expect(screen.getByText(/How to test React components/)).toBeDefined()
    expect(screen.getByText(/Test Master/)).toBeDefined()
  })
})