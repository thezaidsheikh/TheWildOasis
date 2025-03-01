import Spinner from '../../ui/Spinner'
import { useCabin } from './cabin.hook'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router'

function CabinTable() {
  const { cabins, isLoading } = useCabin()
  const [searchParams] = useSearchParams()
  if (isLoading) return <Spinner />

  // Filter
  const discountValue = searchParams.get('discount') || 'all'
  let filteredCabins = []
  if (discountValue === 'all') filteredCabins = cabins
  else if (discountValue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  else if (discountValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0)

  // Sort
  const sortByValue = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortByValue.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  filteredCabins = filteredCabins.sort((a, b) => {
    if (typeof a[field] === 'string') return a[field].localeCompare(b[field]) * modifier
    else return (a[field] - b[field]) * modifier
  })

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
        <Table.Body data={filteredCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}
export default CabinTable
