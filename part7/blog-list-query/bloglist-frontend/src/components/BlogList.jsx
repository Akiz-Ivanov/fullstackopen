import { ListGroup } from 'react-bootstrap'
import Blog from "./Blog"

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="mb-3">Blogs</h2>
      <ListGroup>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList