import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router'
import { getBookingsAfterDate, getStaysAfterDate } from '../../services/apiBookings'

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams()
  const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: bookings, isLoading } = useQuery({ queryFn: () => getBookingsAfterDate(queryDate), queryKey: ['bookings', `last-${numDays}`] })
  return { bookings, isLoading }
}

export const useRecentStays = () => {
  const [searchParams] = useSearchParams()
  const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: stays, isLoading } = useQuery({ queryFn: () => getStaysAfterDate(queryDate), queryKey: ['stays', `last-${numDays}`] })

  const confirmedStays = stays?.filter((stay) => stay.status === 'checked-in' || stay.status === 'checked-out')
  console.log('recent status', stays, confirmedStays)
  return { stays, confirmedStays, isLoading, numDays }
}
