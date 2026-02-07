import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Card } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card className="mb-4 w-50">
      <Card.Body>
        <h3 className="mb-3">Create New Blog</h3>
        <Form onSubmit={addBlog}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Enter blog title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="Enter author name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="https://example.com"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            <i className="bi bi-plus-circle me-2"></i>
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm