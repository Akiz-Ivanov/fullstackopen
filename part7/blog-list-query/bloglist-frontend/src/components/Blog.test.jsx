import { screen } from '@testing-library/react'
import Blog from './Blog'
import { renderWithProviders } from './test-utils'

describe('<Blog /> testing', () => {

  const blog = {
    id: '123',
    title: 'How to test React components',
    author: 'Test Master',
    url: 'https://blog.test.com',
    likes: 5,
    user: { name: 'TestUser' },
    comments: [
      { id: 'c1', text: 'Comment 1' },
      { id: 'c2', text: 'Comment 2' }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<Blog blog={blog} />)
  })

  test('renders title, author, number of likes and comments', () => {
    expect(screen.getByText(/How to test React components/)).toBeDefined()
    expect(screen.getByText(/Test Master/)).toBeDefined()
    expect(screen.getByText(/5/)).toBeDefined()
    expect(screen.getByText(/2/)).toBeDefined()
  })

  test('link points to correct blog page', () => {
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe(`/blogs/${blog.id}`)
  })
})