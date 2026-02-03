import { Link } from 'react-router-dom'

const UsersView = ({ users }) => {


  if (users.length === 0) {
    return (
      <div>
        <h2>Users</h2>
        <p>No users.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>
              user
            </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView