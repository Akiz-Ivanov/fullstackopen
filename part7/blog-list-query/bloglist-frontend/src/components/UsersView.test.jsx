import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UsersView from './UsersView'

describe('<UsersView />', () => {
  test('renders "No users yet." if users is empty', () => {
    render(
      <MemoryRouter>
        <UsersView users={[]} />
      </MemoryRouter>
    )

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText(/no users yet/i)).toBeInTheDocument()
  })

  test('renders all users and blog counts', () => {
    const users = [
      { id: 'u1', name: 'Alice', blogs: [{ id: 'b1', title: 'x' }] },
      { id: 'u2', name: 'Bob', blogs: [{ id: 'b2', title: 'x' }, { id: 'b3', title: 'y' }] },
    ]

    render(
      <MemoryRouter>
        <UsersView users={users} />
      </MemoryRouter>
    )

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('renders correct user link', () => {
    const users = [{ id: 'u1', name: 'Alice', blogs: [] }]

    render(
      <MemoryRouter>
        <UsersView users={users} />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'Alice' })
    expect(link).toHaveAttribute('href', '/users/u1')
  })
})
