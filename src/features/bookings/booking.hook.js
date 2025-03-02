import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router'

export const useBookings = () => {
  const [searchParams] = useSearchParams()

  // Filter
  const filterValue = searchParams.get('status') || 'all'
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue, method: 'eq' }

  // Sort
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByValue?.split('-') || []
  const sortBy = { field, direction, method: 'order' }

  const { data: bookings, isLoading, isError, error } = useQuery({ queryKey: ['bookings', filter, sortBy], queryFn: () => getBookings({ filter, sortBy }) })
  if (isError) {
    toast.error(error.message)
    return null
  }
  return { bookings, isLoading, isError }
}
