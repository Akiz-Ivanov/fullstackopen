import { useState } from "react"
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const Comments = ({ comments, blogId }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    dispatch(commentBlog(blogId, comment))
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