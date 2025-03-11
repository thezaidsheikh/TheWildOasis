import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'
import { getStaysTodayActivity, updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { subDays } from 'date-fns'

export const useCheckin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in `)
      queryClient.invalidateQueries({ active: true })
      navigate('/')
    },
    onError: (error) => {
      console.log(error)
      toast.error('There was an error while checkin')
    },
  })

  return { checkin, isCheckingIn }
}

export const useCheckout = () => {
  const queryClient = useQueryClient()

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out `)
      queryClient.invalidateQueries({ active: true })
    },
    onError: (error) => {
      console.log(error)
      toast.error('There was an error while checkin')
    },
  })

  return { checkout, isCheckingOut }
}

export const useActivityTodayStays = () => {
  const [searchParams] = useSearchParams()
  const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: stays, isLoading } = useQuery({ queryFn: () => getStaysTodayActivity(queryDate), queryKey: ['stays', `last-${numDays}`] })

  const confirmedStays = stays?.filter((stay) => stay.status === 'checked-in' || stay.status === 'checked-out')
  console.log('recent status', stays, confirmedStays)
  return { stays, confirmedStays, isLoading, numDays }
}
