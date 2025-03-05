import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router'
import { PAGE_SIZE } from '../../utils/constants'

export const useBookings = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  // Filter
  const filterValue = searchParams.get('status') || 'all'
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue, method: 'eq' }

  // Sort
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByValue?.split('-') || []
  const sortBy = { field, direction, method: 'order' }

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
  const { data } = useQuery({ queryKey: ['bookings', filter, sortBy, page], queryFn: () => getBookings({ filter, sortBy, page }) })
  const bookings = data?.data
  const isLoading = !data?.isLoading
  const isError = !!data?.error
  const count = data?.count
  const error = data?.error

  // Prefetching next page
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount) {
    const nextPage = page + 1
    queryClient.prefetchQuery({ queryKey: ['bookings', filter, sortBy, nextPage], queryFn: () => getBookings({ filter, sortBy, page: nextPage }) })
  }

  // Prefetching prev page
  if (page > 1) {
    const prevPage = page - 1
    queryClient.prefetchQuery({ queryKey: ['bookings', filter, sortBy, prevPage], queryFn: () => getBookings({ filter, sortBy, page: prevPage }) })
  }

  if (isError) {
    toast.error(error.message)
    return null
  }
  return { bookings, isLoading, isError, count }
}
