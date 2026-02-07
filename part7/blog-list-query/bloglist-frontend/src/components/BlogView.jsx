import { Card, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import Comments from "./Comments"

const BlogView = ({ blog, handleLike, handleDeleteBlog, user }) => {
  if (!blog) {
    return null
  }

  const isUsersBlog = user && blog.user?.name === user?.name

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h2" className="mb-3">
            {blog.title}
          </Card.Title>

          <Card.Subtitle className="mb-3 text-muted">
            by {blog.author}
          </Card.Subtitle>

          <Row className="mb-3">
            <Col>
              <div className="mb-2">
                <strong>URL:</strong>{' '}
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-break"
                >
                  {blog.url}
                </a>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div>
                  <Badge bg="warning" text="dark" className="me-2">
                    <i className="bi bi-heart-fill me-1"></i>
                    {blog.likes} likes
                  </Badge>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleLike(blog)}
                  >
                    <i className="bi bi-heart me-1"></i>
                    Like
                  </Button>
                </div>
              </div>

              <div className="text-muted">
                <small>Added by {blog.user?.name}</small>
              </div>
            </Col>
          </Row>

          {isUsersBlog && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteBlog(blog.id)}
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>

      <Comments comments={blog.comments} blogId={blog.id} />
    </Container>
  )
}

export default BlogView