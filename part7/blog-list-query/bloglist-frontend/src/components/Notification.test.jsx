import { render, screen } from '@testing-library/react'
import Notification from './Notification'
import { NotificationContext, NotificationProvider } from '../context/NotificationContext'

describe('<Notification />', () => {

  test('renders nothing when message is null', () => {
    const { container } = render(
      <NotificationProvider>
        <Notification message={null} />
      </NotificationProvider>
    )
    expect(container.querySelector('.notification')).not.toBeInTheDocument()
  })

  test('renders the message is set', () => {
    const { container } = render(
      <NotificationContext.Provider value={['Test notification', vi.fn()]}>
        <Notification />
      </NotificationContext.Provider>
    )

    expect(container.querySelector('.notification')).toBeInTheDocument()
    expect(screen.getByText('Test notification')).toBeInTheDocument()
  })

})