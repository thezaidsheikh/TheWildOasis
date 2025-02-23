import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSettings, updateSetting } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export const useSettings = () => {
  const { data: hotelSettings, isLoading, isError, error } = useQuery({ queryKey: ['hotelSettings'], queryFn: getSettings })
  if (isError) {
    toast.error(error.message)
    return null
  }
  return { hotelSettings, isLoading, isError }
}

export const useUpdateSetting = () => {
  const queryClient = useQueryClient()
  const { mutate: updateSettingHandler, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelSettings'] })
      toast.success('Setting updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return { updateSettingHandler, isUpdating }
}
