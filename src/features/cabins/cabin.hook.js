import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import getCabins, {
  createCabin,
  deleteCabin,
  editCabin,
} from "../../services/apiCabins";

export const useCabin = () => {
  const {
    data: cabins,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });
  if (isError) {
    toast.error(error.message);
    return null;
  }
  return { cabins, isLoading, isError };
};

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinHandler, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCabinHandler, isDeleting };
};

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabinHandler, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCabinHandler, isCreating };
};

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabinHandler, isLoading: isEditing } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editCabinHandler, isEditing };
};
