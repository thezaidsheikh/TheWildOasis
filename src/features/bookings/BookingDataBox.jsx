import styled from 'styled-components'
import { format, isToday } from 'date-fns'

import { formatDistanceFromNow } from '../../utils/helpers'
import { formatCurrency } from '../../utils/helpers'
import { HiOutlineChatBubbleBottomCenterText, HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineHomeModern } from 'react-icons/hi2'
import DataItem from '../../ui/DataItem'
import { Flag } from '../../ui/Flag'
import { box } from '../../styles/styles'

const StyledBookingDataBox = styled.section`
  padding: 0; /* Adjust padding to fit the new design */
  ${box}
`

const Header = styled.header`
  background-color: var(--color-brand-600);
  padding: 2.5rem 4rem; /* Adjust padding for a more compact header */
  color: #ffffff;
  font-size: 1.8rem; /* Adjust font size */
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-brand-700);
  border-top-left-radius: var(--border-radius-md); /* Add border radius for the top left corner */
  border-top-right-radius: var(--border-radius-md); /* Add border radius for the top right corner */
  border-bottom-left-radius: 0; /* Remove border radius for the bottom left corner */
  border-bottom-right-radius: 0; /* Remove border radius for the bottom right corner */

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`

const Section = styled.section`
  padding: 2.4rem 4rem 1.2rem;
  border-top: 1px solid var(--color-grey-300);
`

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2rem;
  color: var(--color-grey-600);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem; /* Adjust padding for a more compact price section */
  border-radius: var(--border-radius-md);
  margin-top: 1.6rem; /* Adjust margin for better spacing */
  background-color: ${(props) => (props.ispaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)')}; /* Use lighter background */
  color: ${(props) => (props.ispaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)')};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} ({isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)}) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Observations">
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price ispaid={isPaid ? 'true' : ''}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast && ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  )
}

export default BookingDataBox
