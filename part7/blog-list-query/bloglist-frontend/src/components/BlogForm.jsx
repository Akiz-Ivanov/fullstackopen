import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '.5rem' }}>
      <h2>create new</h2>
      <label htmlFor='title'>title</label>
      <input
        id='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <label htmlFor='author'>author</label>
      <input
        id='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <label htmlFor='url'>url</label>
      <input
        id='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type='submit' style={{ marginBlock: '.5rem' }}>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm