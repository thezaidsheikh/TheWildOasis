import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createCabinHandler, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = (data) => {
    console.log(data);
    createCabinHandler(data);
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(submitHandler)}>
      <FormRow label="Cabin name">
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow label="Capacity">
        <Input type="number" id="maxCapacity" {...register("capacity")} />
      </FormRow>

      <FormRow label="Regular Price">
        <Input type="number" id="regularPrice" {...register("price")} />
      </FormRow>

      <FormRow label="Discount">
        <Input type="number" id="discount" defaultValue={0} {...register("discount")} />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea type="number" id="description" defaultValue="" {...register("description")} />
      </FormRow>

      <FormRow label="Cabin image">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
