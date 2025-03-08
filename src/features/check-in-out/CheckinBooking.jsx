import Spinner from '../../ui/Spinner'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import BookingDataBox from '../bookings/BookingDataBox'

import { useBooking } from '../bookings/booking.hook'
import { useMoveBack } from '../../hooks/useMoveBack'
// import { useCheckin } from './useCheckin'

import styled from 'styled-components'
import { box } from '../../styles/styles'
import Checkbox from '../../ui/Checkbox'
import { useState } from 'react'
import { useEffect } from 'react'

const Box = styled.div`
  ${box}
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const { booking, isLoading } = useBooking()
  const [confirmPaid, setConfirmPaid] = useState(false)
  useEffect(() => setConfirmPaid(booking?.isPaid), [booking])
  const moveBack = useMoveBack()

  if (isLoading) return <Spinner />

  const { id: bookingId, guests } = booking

  function handleCheckin() {}

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid((prev) => !prev)} disabled={booking?.isPaid} id="confirm">
          I confirm that {guests.fullName} has paid the total amount
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
