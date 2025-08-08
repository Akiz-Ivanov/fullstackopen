import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  const blogFormRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendNotification = (text) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      sendNotification('Successful login!')
    } catch (exception) {
      sendNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    sendNotification('Logged out')
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLike = async (blogObject) => {
    try {
      const updatedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1
      }
      const returnedBlog = await blogService.addLike(updatedBlog)
      setBlogs(prevBlogs => prevBlogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
    } catch (exception) {
      sendNotification(`Blog '${blogObject.title}' was already removed from server`)
    }
  }

  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm('Delete blog?')
    if (!confirmDelete) return

    try {
      await blogService.deleteBlog(id)
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
      sendNotification('Blog deleted successfully')
    } catch (error) {
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
      const returnedBlog = await blogService.createBlog(blogObject)
      setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
      sendNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
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

      <Notification message={notification} />

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