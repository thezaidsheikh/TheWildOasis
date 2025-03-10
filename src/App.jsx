import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import Booking from './pages/Booking'
import Checkin from './pages/Checkin'
import ProtectedRoutes from './ui/ProtectedRoutes'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
})

/**
 * The App component serves as the root component of the application.
 * It sets up the global context providers, including the QueryClientProvider
 * for managing server state with React Query and the BrowserRouter for handling
 * routing. It defines the main application routes within a nested routing structure,
 * utilizing the AppLayout component for shared layout elements. The component
 * also integrates global styles via GlobalStyles, and configures the React Query Devtools
 * for debugging. The Toaster component is used for displaying toast notifications
 * with customized styling and duration settings.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-600)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
