import { createContext, useReducer, useContext } from "react"
import { useSetNotification } from "./NotificationContext"
import loginService from "../services/login"
import blogService from "../services/blogs"

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const useLogin = () => {
  const dispatch = useUserDispatch()
  const setNotification = useSetNotification()

  return async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: "SET_USER", payload: user })
      setNotification('Successful login!')
    } catch (error) {
      setNotification('Wrong username or password')
      throw error
    }
  }
}

export const useLogout = () => {
  const dispatch = useUserDispatch()
  const setNotification = useSetNotification()

  return () => {
    window.localStorage.removeItem('loggedUser')
    dispatch({ type: "SET_USER", payload: null })
    setNotification('Logged out')
  }
}

export const useUserFromStorage = () => {
  const dispatch = useUserDispatch()

  return () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)

    if (!user || !user.token) return

    dispatch({ type: "SET_USER", payload: user })
    blogService.setToken(user.token)
  }
}