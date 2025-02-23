import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'
import { useCreateCabin, useDeleteCabin } from './cabin.hook'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'

// v1
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function CabinRow({ cabin }) {
  const { id: cabinId, name, capacity, price, discount, image } = cabin
  const { deleteCabinHandler, isDeleting } = useDeleteCabin()
  const { createCabinHandler, isCreating } = useCreateCabin()

  const handleDuplicate = () => {
    createCabinHandler({ ...cabin, name: `Copy of ${name}`, id: undefined })
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={`Cabin ${name}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {capacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="cabin-form">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
              <CreateCabinForm cabinData={cabin} />
            </Modal.Window>
          </Modal>
          <button onClick={() => deleteCabinHandler(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
    </>
  )
}

export default CabinRow
