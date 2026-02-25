import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = (props) => {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: meResult.data?.me?.favoriteGenre },
    skip: !meResult.data?.me
  })

  if (!props.show) return null
  if (booksResult.loading || meResult.loading) return <div>loading...</div>

  const books = booksResult.data?.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{meResult.data?.me?.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr><th></th><th>author</th><th>published</th></tr>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend