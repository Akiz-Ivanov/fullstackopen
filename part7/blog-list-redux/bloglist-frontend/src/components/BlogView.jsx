import Comments from "./Comments"

const BlogView = ({ blog, handleLike, handleDeleteBlog, user }) => {

  if (!blog) {
    return null
  }

  const isUsersBlog = user && blog.user?.name === user?.name

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url} target='_blank' rel="noreferrer">
        {blog.url}
      </a>
      <p>likes {blog.likes}
        <button
          type="button"
          onClick={() => handleLike(blog)}
          className='like-btn'
        >
          Like
        </button>
      </p>
      <p>added by {blog.user?.name}</p>
      {isUsersBlog && (
        <button type="button" onClick={() => handleDeleteBlog(blog.id)}>
          delete
        </button>
      )}
      <Comments comments={blog.comments} blogId={blog.id} />
    </div>
  )
}

export default BlogView