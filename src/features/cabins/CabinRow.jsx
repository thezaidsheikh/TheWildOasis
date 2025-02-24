import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'
import { useCreateCabin, useDeleteCabin } from './cabin.hook'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

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
  const { createCabinHandler } = useCreateCabin()

  const handleDuplicate = () => {
    createCabinHandler({ ...cabin, name: `Copy of ${name}`, id: undefined })
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} alt={`Cabin ${name}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {capacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="cabin-edit">
                  <Menus.Button icon={<HiPencil />}>Edit Cabin</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="cabin-delete">
                  <Menus.Button icon={<HiTrash />}>Delete Cabin</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="cabin-edit">
                <CreateCabinForm cabinData={cabin} />
              </Modal.Window>
              <Modal.Window name="cabin-delete">
                <ConfirmDelete resource="cabin" onConfirm={() => deleteCabinHandler(cabinId)} disabled={isDeleting} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

export default CabinRow
