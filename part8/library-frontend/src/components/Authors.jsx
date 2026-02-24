import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = (props) => {

  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading || !result.data) return <div>loading...</div>


  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    const selectedName = name || authors[0]?.name || ''
    const parsedBirthyear = parseInt(birthyear, 10)
    editAuthor({ variables: { name: selectedName, setBornTo: parsedBirthyear } })
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">
          name
        </label>
        <select
          id="name"
          name="name"
          value={name || authors[0]?.name || ''}
          onChange={({ target }) => setName(target.value)}
        >
          {authors.map(author =>
            <option
              key={author.id}
              value={author.name}
            >
              {author.name}
            </option>
          )}
        </select>

        <label htmlFor="birthyear">
          born
        </label>
        <input
          id="birthyear"
          name="birthyear"
          type="number"
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
        />

        <button type="submit">
          update author
        </button>
      </form>
    </div>
  )
}

export default Authors
