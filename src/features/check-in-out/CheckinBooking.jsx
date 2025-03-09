import Spinner from '../../ui/Spinner'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import BookingDataBox from '../bookings/BookingDataBox'

import { useBooking } from '../bookings/booking.hook'
import { useMoveBack } from '../../hooks/useMoveBack'

import styled from 'styled-components'
import { box } from '../../styles/styles'
import Checkbox from '../../ui/Checkbox'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCheckin } from './checkin.hook'
import { useSettings } from '../settings/setting.hook'
import { formatCurrency } from '../../utils/helpers'

const Box = styled.div`
  ${box}
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const { booking, isLoading } = useBooking()
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  useEffect(() => {
    setConfirmPaid(booking?.isPaid)
    setAddBreakfast(booking?.hasBreakfast)
  }, [booking])

  const moveBack = useMoveBack()
  const { checkin, isCheckingIn } = useCheckin()
  const { hotelSettings, isLoading: isSettingsLoading } = useSettings()

  if (isLoading || isSettingsLoading) return <Spinner />

  const { id: bookingId, guests, numNights, hasBreakfast, numGuests, totalPrice } = booking
  const optionalBreakfastPrice = hotelSettings?.breakfastPrice * numNights * numGuests

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({ bookingId, breakfast: { hasBreakfast: true, extrasPrice: optionalBreakfastPrice, totalPrice: totalPrice + optionalBreakfastPrice } })
    } else checkin({ bookingId, breakfast: {} })
  }

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev)
              setConfirmPaid(false)
            }}
            id="confirmBreakfast"
          >
            Add breakfast for {`${formatCurrency(optionalBreakfastPrice)}`}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid((prev) => !prev)} disabled={confirmPaid} id="confirm">
          I confirm that {guests.fullName} has paid the total amount of
          {!addBreakfast
            ? ` ${formatCurrency(booking?.totalPrice)}`
            : ` ${formatCurrency(booking?.totalPrice + optionalBreakfastPrice)} (${formatCurrency(booking?.totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
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
