import { render, screen } from '@testing-library/react'
import Notification from './Notification'
import { NotificationContext, NotificationProvider } from '../context/NotificationContext'

describe('<Notification />', () => {

  test('renders nothing when message is null', () => {
    const { container } = render(
      <NotificationProvider>
        <Notification />
      </NotificationProvider>
    )
    expect(container.querySelector('.notification')).not.toBeInTheDocument()
  })

  test('renders the message is set', () => {
    render(
      <NotificationContext.Provider value={['Test notification', vi.fn()]}>
        <Notification />
      </NotificationContext.Provider>
    )
    expect(screen.getByText('Test notification')).toHaveClass('notification')
  })

})