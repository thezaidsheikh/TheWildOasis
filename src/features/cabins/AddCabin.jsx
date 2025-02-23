import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false)
  const closeModelHandler = () => setIsOpenModel(false)
  return (
    <div>
      <Button onClick={() => setIsOpenModel((show) => !show)}>Add new cabin</Button>
      {isOpenModel && (
        <Modal onCloseModal={closeModelHandler}>
          <CreateCabinForm onCloseModal={closeModelHandler} />
        </Modal>
      )}
    </div>
  )
}

export default AddCabin
