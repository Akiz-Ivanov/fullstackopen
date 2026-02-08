import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'

import { UserProvider } from '../context/UserContext'
import { NotificationProvider } from '../context/NotificationContext'

export const renderWithProviders = (component) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <UserProvider>
          <MemoryRouter>
            {component}
          </MemoryRouter>
        </UserProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}