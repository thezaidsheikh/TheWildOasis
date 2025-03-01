import Menus from '../../ui/Menus'
import Table from '../../ui/Table'
import { useBookings } from './booking.hook'
import BookingRow from './BookingRow'

const BookingTable = () => {
  const { bookings } = useBookings()
  console.log(bookings)
  return (
    <Menus>
      <Table coloumns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.1fr">
        <Table.Header role="row">
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={bookings || []} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />
      </Table>
    </Menus>
  )
}

export default BookingTable
