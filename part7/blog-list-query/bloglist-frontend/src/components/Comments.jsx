import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap'
import blogService from '../services/blogs'

const Comments = ({ comments, blogId }) => {
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')

  const newCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) => blogService.addComment(blogId, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      )
    },
  })

  const handleComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    newCommentMutation.mutate({ comment, blogId })
    setComment('')
  }

  return (
    <Card className="mt-4">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <h4 className="mb-0 me-2">Comments</h4>
          <Badge bg="secondary">{comments?.length || 0}</Badge>
        </div>

        {comments && comments.length > 0 ? (
          <ListGroup variant="flush" className="mb-3">
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>
                <i className="bi bi-chat-quote me-2 text-muted"></i>
                {comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No comments yet. Be the first to comment!</p>
        )}

        <Form onSubmit={handleComment}>
          <Form.Group>
            <Form.Label>Add a comment</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                placeholder="Write a comment..."
              />
              <Button type="submit" variant="primary">
                <i className="bi bi-send me-1"></i>
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Comments