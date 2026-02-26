import { useLazyQuery, useQuery } from "@apollo/client/react"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const initialResult = useQuery(ALL_BOOKS)
  const [getBooks, { data: filteredData }] = useLazyQuery(ALL_BOOKS)

  if (!props.show) return null
  if (initialResult.loading) return <div>loading...</div>

  const books = selectedGenre
    ? (filteredData?.allBooks ?? [])
    : (initialResult.data?.allBooks ?? [])

  const handleGenre = (genre) => {
    const genreVar = genre === 'all' ? undefined : genre
    setSelectedGenre(genreVar)
    getBooks({ variables: { genre: genreVar } })
  }

  return (
    <div>
      <h2>books</h2>
      {books.length > 0
        ? <table>
          <tbody>
            <tr><th></th><th>author</th><th>published</th></tr>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : <p>No books found</p>}

      {["refactoring", "agile", "patterns", "design", "crime", "classic"].map(item => (
        <button key={item} onClick={() => handleGenre(item)} aria-pressed={selectedGenre === item}>{item}</button>
      ))}
      <button onClick={() => handleGenre('all')}>all genres</button>
    </div>
  )
}

export default Books