import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './login.hook'

export function Logout() {
  const { logout, isLoading } = useLogout()
  return (
    <ButtonIcon
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault()
        logout()
      }}
    >
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  )
}

export default Logout
