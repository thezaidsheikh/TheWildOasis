import { useMutation } from '@tanstack/react-query'
import { loginAPI } from '../../services/apiAuth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const navigate = useNavigate()
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      console.log('user login', data)
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { login, isLoading, error }
}
