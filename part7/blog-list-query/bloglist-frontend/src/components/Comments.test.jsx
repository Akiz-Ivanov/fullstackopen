import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comments from './Comments'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const renderWithQueryClient = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('<Comments />', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders "No comments yet" if comments empty', () => {
    renderWithQueryClient(<Comments comments={[]} blogId="123" />)

    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders all comments', () => {
    renderWithQueryClient(
      <Comments comments={['first comment', 'second comment']} blogId="123" />
    )

    expect(screen.getByText('first comment')).toBeInTheDocument()
    expect(screen.getByText('second comment')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('calls addComment when submitting new comment', async () => {
    const user = userEvent.setup()

    blogService.addComment.mockResolvedValue({
      id: '123',
      comments: ['existing comment', 'new comment'],
    })

    renderWithQueryClient(
      <Comments comments={['existing comment']} blogId="123" />
    )

    const input = screen.getByPlaceholderText(/write a comment/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'new comment')
    await user.click(button)

    expect(blogService.addComment).toHaveBeenCalledTimes(1)
    expect(blogService.addComment).toHaveBeenCalledWith('123', 'new comment')
  })

  test('does not call addComment if comment is empty', async () => {
    const user = userEvent.setup()

    renderWithQueryClient(<Comments comments={[]} blogId="123" />)

    const button = screen.getByRole('button', { name: /add/i })
    await user.click(button)

    expect(blogService.addComment).not.toHaveBeenCalled()
  })
})
