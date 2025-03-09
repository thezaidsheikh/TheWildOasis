import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

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
