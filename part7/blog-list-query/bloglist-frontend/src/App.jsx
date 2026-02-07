import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSetNotification } from './context/NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLogin, useLogout, useUserFromStorage, useUserValue } from './context/UserContext'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import userService from './services/users'
import UsersView from './components/UsersView'
import BlogView from './components/BlogView'
import User from './components/User'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

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

  const { data: users = [], isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1
  })

  const blogFormRef = useRef(null)

  const setNotification = useSetNotification()

  const login = useLogin()
  const logout = useLogout()
  const userFromStorage = useUserFromStorage()

  const reloadUsers = async () => {
    try {
      const updatedUsers = await userService.getAll()
      setUsers(updatedUsers)
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm('Delete blog?')
    if (!confirmDelete) return

    deleteBlogMutation.mutate(id)

    await reloadUsers()
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
    await reloadUsers()
  }
  const matchUser = useMatch('/users/:id')
  const selectedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <div className="app-layout d-flex flex-column min-vh-100">

      <Notification />


      {!user && (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      )}

      {user && (
        <>

          <Header user={user} handleLogout={handleLogout} />

          <Container className='flex-grow-1'>

            <Routes>
              <Route path="/blogs/:id" element={
                <BlogView
                  blog={selectedBlog}
                  handleLike={handleLike}
                  handleDeleteBlog={handleDeleteBlog}
                  user={user}
                />
              } />
              <Route path="/users/:id" element={<User user={selectedUser} />} />
              <Route path="/users" element={
                isLoadingUsers ? (
                  <p>Loading users...</p>
                ) : isErrorUsers ? (
                  <p>Failed to load users</p>
                ) : (
                  <UsersView users={users} />
                )
              }
              />
              <Route
                path="/"
                element={
                  isLoading ? (
                    <p>Loading blogs...</p>
                  ) : isError ? (
                    <p>Failed to load blogs</p>
                  ) : (
                    <BlogList blogs={blogs} />
                  )
                }
              />
            </Routes>
            {isHomePage && (
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
            )}

          </Container>

          {isLoading && <p>Loading blogs...</p>}
          {isError && <p>Failed to load blogs</p>}
        </>
      )}

      <Footer />

    </div>
  )
}

export default App