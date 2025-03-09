import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export const useCheckin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in `)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      navigate('/')
    },
    onError: (error) => {
      console.log(error)
      toast.error('There was an error while checkin')
    },
  })

  return { checkin, isCheckingIn }
}
