import { useSearchParams } from 'react-router'
import Select from './Select'

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortByValue = searchParams.get('sortBy') || options.at(0)?.value

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return <Select options={options} value={sortByValue} onChange={handleChange} />
}

export default SortBy
