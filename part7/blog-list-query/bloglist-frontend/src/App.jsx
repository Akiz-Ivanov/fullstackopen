import { useState, useEffect, useRef, use } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSetNotification } from './context/NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLogin, useLogout, useUserFromStorage, useUserValue } from './context/UserContext'

const App = () => {
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()

  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)
  const blogFormRef = useRef(null)

  const setNotification = useSetNotification()

  const login = useLogin()
  const logout = useLogout()
  const userFromStorage = useUserFromStorage()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        [...blogs, newBlog]
      )
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    },
    onError: (error) => {
      setNotification('Failed to add blog. Please check your input or try again later.')
    }
  })

  const updateBlogLikesMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
      )
    },
    onError: (error, variables) => {
      setNotification(`Blog '${variables.title}' was already removed from server`)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, deletedId) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter(blog => blog.id !== deletedId)
      )
      setNotification('Blog deleted successfully')
    },
    onError: (error) => {
      setNotification('Failed to delete the blog')
    }
  })

  useEffect(() => {
    userFromStorage()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLike = (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1
    }
    updateBlogLikesMutation.mutate(updatedBlog)
  }

  const handleDeleteBlog = (id) => {
    const confirmDelete = window.confirm('Delete blog?')
    if (!confirmDelete) return

    deleteBlogMutation.mutate(id)
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

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
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
          {isLoading && <p>Loading blogs...</p>}
          {isError && <p>Failed to load blogs</p>}
        </div>
      )}

    </div>
  )
}

export default App