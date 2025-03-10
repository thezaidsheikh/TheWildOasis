import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, loginAPI } from '../../services/apiAuth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData(['user'], data)
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { login, isLoading, error }
}

export const useUser = () => {
  const { data: user, isLoading: isUserLoading, isError, error } = useQuery({ queryKey: ['user'], queryFn: getCurrentUser })
  if (isError) {
    toast.error(error.message)
    return { user, isUserLoading, isError, isAuthenticated: false }
  }
  const role = user?.user?.role
  return { user, isUserLoading, isError, isAuthenticated: role === 'authenticated' }
}
