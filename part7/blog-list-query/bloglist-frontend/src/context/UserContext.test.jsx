import { renderHook, act } from "@testing-library/react"
import {
  UserProvider,
  useUserValue,
  useUserDispatch,
  useLogin,
  useLogout,
  useUserFromStorage
} from "./UserContext"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { vi } from 'vitest'

vi.mock('../services/login')
vi.mock('../services/blogs')
vi.mock('./NotificationContext', () => ({
  useSetNotification: () => vi.fn()
}))

const mockUser = {
  id: 'u1',
  name: 'Test User',
  username: 'testuser',
  token: 'fake-token-123',
}

describe('UserContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('initial value is null', () => {
    const { result } = renderHook(() => useUserValue(), {
      wrapper: UserProvider
    })
    expect(result.current).toBe(null)
  })

  test('wrong action type returns state unchanged', () => {
    const { result } = renderHook(
      () => ({
        value: useUserValue(),
        dispatch: useUserDispatch()
      }),
      { wrapper: UserProvider }
    )

    act(() => {
      result.current.dispatch({ type: 'WRONG_ACTION_TYPE', payload: 'test' })
    })

    expect(result.current.value).toBe(null)
  })

  test('useLogin sets user on successful login', async () => {
    loginService.login.mockResolvedValue(mockUser)

    const { result } = renderHook(
      () => ({
        user: useUserValue(),
        login: useLogin()
      }),
      { wrapper: UserProvider }
    )

    await act(async () => {
      await result.current.login('testuser', 'password')
    })

    expect(result.current.user).toEqual(mockUser)
    expect(blogService.setToken).toHaveBeenCalledWith(mockUser.token)
    expect(localStorage.getItem('loggedUser')).toBe(JSON.stringify(mockUser))
  })

  test('useLogin throws error on failed login', async () => {
    loginService.login.mockRejectedValue(new Error('Invalid credentials'))

    const { result } = renderHook(() => useLogin(), {
      wrapper: UserProvider
    })

    await expect(async () => {
      await act(async () => {
        await result.current('testuser', 'wrong')
      })
    }).rejects.toThrow()
  })

  test('useLogout clears user', () => {
    localStorage.setItem('loggedUser', JSON.stringify(mockUser))

    const { result } = renderHook(
      () => ({
        user: useUserValue(),
        logout: useLogout()
      }),
      { wrapper: UserProvider }
    )

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBe(null)
    expect(localStorage.getItem('loggedUser')).toBe(null)
  })

  test('useUserFromStorage loads user from localStorage', () => {
    localStorage.setItem('loggedUser', JSON.stringify(mockUser))

    const { result } = renderHook(
      () => ({
        user: useUserValue(),
        loadUser: useUserFromStorage()
      }),
      { wrapper: UserProvider }
    )

    act(() => {
      result.current.loadUser()
    })

    expect(result.current.user).toEqual(mockUser)
    expect(blogService.setToken).toHaveBeenCalledWith(mockUser.token)
  })

  test('useUserFromStorage does nothing when no user in storage', () => {
    const { result } = renderHook(
      () => ({
        user: useUserValue(),
        loadUser: useUserFromStorage()
      }),
      { wrapper: UserProvider }
    )

    act(() => {
      result.current.loadUser()
    })

    expect(result.current.user).toBe(null)
  })

  test('useUserFromStorage does nothing when token is missing', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ ...mockUser, token: null }))

    const { result } = renderHook(
      () => ({
        user: useUserValue(),
        loadUser: useUserFromStorage()
      }),
      { wrapper: UserProvider }
    )

    act(() => {
      result.current.loadUser()
    })

    expect(result.current.user).toBe(null)
  })
})