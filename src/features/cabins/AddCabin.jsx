import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

// Currently addCabin component tracking to open model and check whether to open the model or not.
// Although Modal itself should know whether to open or close it, it's not a good idea to pass that knowledge down to it.
// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false)
//   const closeModelHandler = () => setIsOpenModel(false)
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>Add new cabin</Button>
//       {isOpenModel && (
//         <Modal onCloseModal={closeModelHandler}>
//           <CreateCabinForm onCloseModal={closeModelHandler} />
//         </Modal>
//       )}
//     </div>
//   )
// }

export default AddCabin
