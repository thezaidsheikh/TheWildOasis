import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSettings, useUpdateSetting } from './setting.hook'

function UpdateSettingsForm() {
  const { hotelSettings } = useSettings()
  const { updateSettingHandler } = useUpdateSetting()

  function handleUpdate(e) {
    e.preventDefault()
    if (!e.target.value) return
    updateSettingHandler({ [e.target.id]: e.target.value })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="minBookingLength" defaultValue={hotelSettings?.minBookingLength} onBlur={handleUpdate} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="maxBookingLength" defaultValue={hotelSettings?.maxBookingLength} onBlur={handleUpdate} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="maxGuestsPerBooking" defaultValue={hotelSettings?.maxGuestsPerBooking} onBlur={handleUpdate} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfastPrice" defaultValue={hotelSettings?.breakfastPrice} onBlur={handleUpdate} />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
