// import SortBy from '../../ui/SortBy'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'price-asc', label: 'Sort by price (low first)' },
          {
            value: 'price-desc',
            label: 'Sort by price (high first)',
          },
          { value: 'capacity-asc', label: 'Sort by capacity (low first)' },
          {
            value: 'capacity-desc',
            label: 'Sort by capacity (high first)',
          },
        ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations
