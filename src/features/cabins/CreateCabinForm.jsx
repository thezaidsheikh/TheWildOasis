import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { createCabin, editCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinData = {} }) {
  console.log(`CreateCabinForm - ${new Date().toTimeString()}`, cabinData);
  const { id: cabinId } = cabinData || {};
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cabinData?.name || "",
      capacity: cabinData?.capacity || null,
      price: cabinData?.price || null,
      discount: cabinData?.discount || 0,
      description: cabinData?.description || "",
      image: cabinData?.image || null,
    },
    keepValues: false,
  });

  // useEffect(() => {
  //   reset({
  //     name: cabinData?.name || "",
  //     capacity: cabinData?.capacity || null,
  //     price: cabinData?.price || null,
  //     discount: cabinData?.discount || 0,
  //     description: cabinData?.description || "",
  //     image: cabinData?.image || null,
  //   });
  // }, [cabinData, reset]);

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

  const { mutate: editCabinHandler, isLoading: isEditing } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const imageValue = watch("image");
  console.log("Image field value:", imageValue);

  const submitHandler = (data) => {
    if (cabinId) return editCabinHandler({ ...data, id: cabinId });
    return createCabinHandler(data);
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(submitHandler, errorHandler)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Capacity" error={errors?.capacity?.message}>
        <Input type="number" id="capacity" {...register("capacity", { required: "This field is required", min: { value: 1, message: "Capacity should be at least 1" } })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.price?.message}>
        <Input type="number" id="price" {...register("price", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", { required: "This field is required", validate: (value) => value <= getValues().price || "Discount should be less than regular price" })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="text" id="description" defaultValue="" {...register("description", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Cabin image" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setValue("image", file, { shouldValidate: true });
            } else {
              setValue("image", null, { shouldValidate: true }); // Clear the field if no file is selected
            }
          }}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>{cabinId ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
