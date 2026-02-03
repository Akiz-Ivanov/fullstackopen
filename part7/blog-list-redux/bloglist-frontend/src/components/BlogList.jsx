import Blog from './Blog'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <ul
        style={{
          margin: '0',
          paddingLeft: '0',
        }}
        className='blog-list'
      >
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </div>
  )
}

export default BlogList