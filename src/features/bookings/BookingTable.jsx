import Menus from '../../ui/Menus'
import Table from '../../ui/Table'

const BookingTable = () => {
  const bookings = []
  return (
    <Menus>
      <Table coloumns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={bookings} />
      </Table>
    </Menus>
  )
}

export default BookingTable
