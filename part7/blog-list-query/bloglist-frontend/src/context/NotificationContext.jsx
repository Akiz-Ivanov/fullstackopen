import { createContext, useReducer, useContext, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useSetNotification = () => {

  const dispatch = useNotificationDispatch()
  const timeoutRef = useRef(null)

  return (notification, seconds = 5) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification
    })
    timeoutRef.current = setTimeout(() =>
      dispatch({ type: "CLEAR_NOTIFICATION" })
      , seconds * 1000)
  }
}