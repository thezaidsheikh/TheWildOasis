import styled from 'styled-components'
import { useUser } from '../features/authentication/login.hook'
import Spinner from './Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const FullWidth = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`
export function ProtectedRoutes({ children }) {
  const { isUserLoading, isAuthenticated } = useUser()
  const navigate = useNavigate()
  console.log('Check', isAuthenticated, isUserLoading)

  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) navigate('/login')
  }, [isAuthenticated, isUserLoading, navigate])
  if (isUserLoading)
    return (
      <FullWidth>
        <Spinner />
      </FullWidth>
    )

  return children
}

export default ProtectedRoutes
