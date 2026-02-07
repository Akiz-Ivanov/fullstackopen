import { Toast, ToastContainer } from 'react-bootstrap'
import { useNotificationValue, useSetNotification } from '../context/NotificationContext'

const Notification = () => {
  const message = useNotificationValue()
  const setNotification = useSetNotification()

  if (!message) {
    return null
  }

  // Determine variant based on message content
  const getVariant = () => {
    if (!message) return 'info'
    const lower = message.toLowerCase()
    if (lower.includes('success') || lower.includes('added')) return 'success'
    if (lower.includes('error') || lower.includes('failed') || lower.includes('wrong')) return 'danger'
    if (lower.includes('deleted') || lower.includes('removed')) return 'warning'
    return 'info'
  }

  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast
        onClose={() => setNotification('')}
        autohide
        delay={5000}
        bg={getVariant()}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={getVariant() === 'danger' || getVariant() === 'success' ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notification