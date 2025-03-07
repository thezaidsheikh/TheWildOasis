import { useNavigate } from 'react-router'
import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useBooking } from './booking.hook'
import Empty from '../../ui/Empty'
import Spinner from '../../ui/Spinner'
import { useMoveBack } from '../../hooks/useMoveBack'
// import { useCheckout } from '../check-in-out/useCheckout'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking()
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout()

  const moveBack = useMoveBack()
  const navigate = useNavigate()

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource="booking" />

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  const { id: bookingId, status } = booking

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking # {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
