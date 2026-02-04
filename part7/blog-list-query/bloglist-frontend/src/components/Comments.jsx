import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
    <div>
      <h3>comments</h3>
      {comments.length > 0 && (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default Comments