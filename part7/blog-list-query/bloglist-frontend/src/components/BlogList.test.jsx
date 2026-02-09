import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'
import { MemoryRouter } from 'react-router-dom'

describe('<BlogList />', () => {
  test('renders heading Blogs', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={[]} />
      </MemoryRouter>
    )

    expect(screen.getByText('Blogs')).toBeInTheDocument()
  })

  test('renders all blogs', () => {
    const blogs = [
      { id: '1', title: 'First blog', author: 'A', url: 'x', likes: 1 },
      { id: '2', title: 'Second blog', author: 'B', url: 'y', likes: 5 },
    ]

    render(
      <MemoryRouter>
        <BlogList blogs={blogs} />
      </MemoryRouter>
    )

    expect(screen.getByText('First blog')).toBeInTheDocument()
    expect(screen.getByText('Second blog')).toBeInTheDocument()
  })
})
