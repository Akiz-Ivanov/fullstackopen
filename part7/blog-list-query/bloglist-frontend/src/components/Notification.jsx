import PropTypes from 'prop-types'
import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {
  const message = useNotificationValue()

  if (!message) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification