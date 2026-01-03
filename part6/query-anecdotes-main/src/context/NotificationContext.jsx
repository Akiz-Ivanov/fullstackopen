import { createContext, useReducer, useContext, useCallback } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "REMOVE":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
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

  return (notification, seconds) => {
    dispatch({
      type: "SHOW",
      payload: notification
    })
    setTimeout(() =>
      dispatch({ type: "REMOVE" })
      , seconds * 1000)
  }
}

export default NotificationContext