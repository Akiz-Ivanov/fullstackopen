import { Link } from 'react-router-dom'
import { ListGroup, Badge } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const commentCount = blog.comments?.length || 0

  return (
    <ListGroup.Item
      action
      as={Link}
      to={`/blogs/${blog.id}`}
      className="d-flex justify-content-between align-items-center"
    >
      <div className="flex-grow-1">
        <div className="fw-bold" style={{ color: '#3d2f1f' }}>
          {blog.title}
        </div>
        <small className="text-muted">{blog.author}</small>
      </div>

      <div className="d-flex gap-2">
        <Badge bg="warning" text="dark">
          <i className="bi bi-heart-fill me-1"></i>
          {blog.likes}
        </Badge>
        <Badge bg="secondary">
          <i className="bi bi-chat-fill me-1"></i>
          {commentCount}
        </Badge>
      </div>
    </ListGroup.Item>
  )
}

export default Blog