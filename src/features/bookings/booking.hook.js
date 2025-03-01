import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export const useBookings = () => {
  const { data: bookings, isLoading, isError, error } = useQuery({ queryKey: ['bookings'], queryFn: getBookings })
  if (isError) {
    toast.error(error.message)
    return null
  }
  return { bookings, isLoading, isError }
}
