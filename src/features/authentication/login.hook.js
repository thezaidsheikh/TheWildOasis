import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentUserAPI, loginAPI, logoutAPI, signupAPI } from '../../services/apiAuth'
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
      queryClient.setQueryData(['user'], data.user)
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { login, isLoading, error }
}

export const useUser = () => {
  const { data: user, isLoading: isUserLoading, isError, error } = useQuery({ queryKey: ['user'], queryFn: getCurrentUserAPI })
  if (isError) {
    toast.error(error.message)
    return { user, isUserLoading, isError, isAuthenticated: false }
  }
  const role = user?.role
  return { user, isUserLoading, isError, isAuthenticated: role === 'authenticated' }
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { logout, isLoading, error }
}

export const useSignup = () => {
  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success('Account created succesfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return { signup, isLoading, error }
}
