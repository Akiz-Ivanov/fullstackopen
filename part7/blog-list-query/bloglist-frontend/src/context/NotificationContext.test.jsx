import { renderHook, act } from "@testing-library/react"
import {
  NotificationProvider,
  useNotificationValue,
  useNotificationDispatch,
  useSetNotification
} from "./NotificationContext"
import { vi } from 'vitest'

describe('NotificationContext', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('initial value is null', () => {
    const { result } = renderHook(() => useNotificationValue(), {
      wrapper: NotificationProvider
    })
    expect(result.current).toBe(null)
  })

  test('wrong action type returns state unchanged', () => {
    const { result } = renderHook(
      () => ({
        value: useNotificationValue(),
        dispatch: useNotificationDispatch()
      }),
      { wrapper: NotificationProvider }
    )

    act(() => {
      result.current.dispatch({ type: 'WRONG_ACTION_TYPE', payload: 'test' })
    })

    expect(result.current.value).toBe(null)
  })

  test('SET_NOTIFICATION sets the notification', () => {
    const { result } = renderHook(
      () => ({
        value: useNotificationValue(),
        dispatch: useNotificationDispatch()
      }),
      { wrapper: NotificationProvider }
    )

    act(() => {
      result.current.dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'test notification'
      })
    })

    expect(result.current.value).toBe('test notification')
  })

  test('CLEAR_NOTIFICATION clears the notification', () => {
    const { result } = renderHook(
      () => ({
        value: useNotificationValue(),
        dispatch: useNotificationDispatch()
      }),
      { wrapper: NotificationProvider }
    )

    act(() => {
      result.current.dispatch({ type: 'SET_NOTIFICATION', payload: 'test' })
    })

    act(() => {
      result.current.dispatch({ type: 'CLEAR_NOTIFICATION' })
    })

    expect(result.current.value).toBe(null)
  })

  test('useSetNotification sets and clears notification after timeout', () => {
    const { result } = renderHook(
      () => ({
        value: useNotificationValue(),
        setNotification: useSetNotification()
      }),
      { wrapper: NotificationProvider }
    )

    act(() => {
      result.current.setNotification('test notification', 5)
    })

    expect(result.current.value).toBe('test notification')

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.value).toBe(null)
  })

  test('useSetNotification clears previous timeout when called again', () => {
    const { result } = renderHook(
      () => ({
        value: useNotificationValue(),
        setNotification: useSetNotification()
      }),
      { wrapper: NotificationProvider }
    )

    act(() => {
      result.current.setNotification('first', 5)
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    act(() => {
      result.current.setNotification('second', 5)
    })

    expect(result.current.value).toBe('second')

    act(() => {
      vi.advanceTimersByTime(3000) //* only 3 more seconds (total 5 from second call)
    })

    expect(result.current.value).toBe('second') //* still there

    act(() => {
      vi.advanceTimersByTime(2000) //* now 5 seconds from second call
    })

    expect(result.current.value).toBe(null)
  })
})