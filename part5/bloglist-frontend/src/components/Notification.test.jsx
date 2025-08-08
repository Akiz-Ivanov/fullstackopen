import { render, screen } from '@testing-library/react'
import Notification from './Notification'

describe('<Notification />', () => {

  test('renders nothing when message is null', () => {
    const { container } = render(<Notification message={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  test('renders the message when given', () => {
    render(<Notification message="Test notification" />)
    expect(screen.getByText('Test notification')).toBeInTheDocument()
    expect(screen.getByText('Test notification')).toHaveClass('notification')
  })

})