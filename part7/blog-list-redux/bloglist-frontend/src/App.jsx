import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { loginUser, loginUserFromStorage, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  const blogFormRef = useRef(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(loginUserFromStorage())
  }, [])

  const sendNotification = (text) => {
    dispatch(setNotification(text, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      sendNotification('Successful login!')
    } catch (exception) {
      sendNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    sendNotification('Logged out')
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch {
      sendNotification(`Blog '${blog.title}' was already removed from server`)
    }
  }

  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm('Delete blog?')
    if (!confirmDelete) return

    try {
      await dispatch(deleteBlog(id))
      sendNotification('Blog deleted successfully')
    } catch {
      sendNotification('Failed to delete the blog')
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    )
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      await dispatch(createNewBlog(blogObject))
      sendNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch {
      sendNotification('Failed to add blog. Please check your input or try again later.')
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blog List App</h1>

      <Notification />

      {!user && loginForm()}

      {user && (
        <div>
          <div>

            <p>{user.name} logged in</p>

            <button
              type='button'
              onClick={handleLogout}
            >
              logout
            </button>

            {newBlogForm()}

          </div>

          <h2>blogs</h2>
          <ul
            style={{
              margin: '0',
              paddingLeft: '0',
            }}
            className='blog-list'
          >
            {sortedBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={user ? user.name : null} />
            )}
          </ul>
        </div>
      )}

    </div>
  )
}

export default App