import Spinner from '../../ui/Spinner'
import { useCabin } from './cabin.hook'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import Menus from '../../ui/Menus'

function CabinTable() {
  const { cabins, isLoading } = useCabin()
  if (isLoading) return <Spinner />
  return (
    <Menus>
      <Table coloumns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}
export default CabinTable
