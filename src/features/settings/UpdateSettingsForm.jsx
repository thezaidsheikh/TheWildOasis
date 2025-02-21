import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings, useUpdateSetting } from "./setting.hook";

function UpdateSettingsForm() {
  const { hotelSettings } = useSettings();
  const { mutate: updateSettingHandler, isLoading: isUpdating } = useUpdateSetting();

  function handleUpdate(e) {
    e.preventDefault();
    console.log("New input value", e.target.value);
    if (!e.target.value) return;
    updateSettingHandler();
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={hotelSettings?.minBookingLength} onBlur={handleUpdate} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={hotelSettings?.maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={hotelSettings?.maxGuestsPerBooking} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={hotelSettings?.breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
