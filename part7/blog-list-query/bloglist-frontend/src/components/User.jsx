import { Link } from "react-router-dom"
import { Container, Card, ListGroup, Badge } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: '60px', height: '60px' }}>
              <i className="bi bi-person-fill fs-2"></i>
            </div>
            <div>
              <Card.Title as="h2" className="mb-1">{user.name}</Card.Title>
              <Badge bg="secondary">
                {user.blogs.length} {user.blogs.length === 1 ? 'blog' : 'blogs'}
              </Badge>
            </div>
          </div>

          <h4 className="mt-4 mb-3">Added Blogs</h4>
          {user.blogs.length === 0 ? (
            <p className="text-muted">No blogs added yet.</p>
          ) : (
            <ListGroup>
              {user.blogs.map(blog => (
                <ListGroup.Item
                  key={blog.id}
                  action
                  as={Link}
                  to={`/blogs/${blog.id}`}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span className="fw-semibold" style={{ color: '#3d2f1f' }}>
                    {blog.title}
                  </span>
                  <i className="bi bi-arrow-right text-muted"></i>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default User