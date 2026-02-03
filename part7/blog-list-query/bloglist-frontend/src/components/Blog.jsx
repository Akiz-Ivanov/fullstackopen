import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog, user }) => {

  const [showDetails, setShowDetails] = useState(false)

  const details = () => (
    <div className='details'>
      <p>{blog.url}</p>
      <p>likes {blog.likes}
        <button
          type="button"
          onClick={() => handleLike(blog)}
          className='like-btn'
        >
          Like
        </button>
      </p>
      <p>{blog.user?.name}</p>
      {isUsersBlog && (
        <button
          type="button"
          onClick={() => handleDeleteBlog(blog.id)}
          className='delete-btn'
        >
          delete
        </button>
      )}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isUsersBlog = user && blog.user?.name === user

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>
          {blog.title} {blog.author} &nbsp;
          <button
            type="button"
            onClick={() => setShowDetails(prevShowDetails => !prevShowDetails)}
            className='details-btn'
          >
            {showDetails ? 'hide' : 'view'}
          </button>
        </p>
      </div>

      {showDetails && details()}

    </div>
  )
}

export default Blog