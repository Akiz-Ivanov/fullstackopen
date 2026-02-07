import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const UsersView = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Users</h2>
        <p className="text-muted">No users yet.</p>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Users</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="fw-semibold text-decoration-none"
                  style={{ color: '#d97636' }}
                >
                  {user.name}
                </Link>
              </td>
              <td>
                <span className="badge bg-secondary">{user.blogs.length}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UsersView