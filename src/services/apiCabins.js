import supabase from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Fetching Cabins Error", error.message);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Delete Cabins Error", error.message);
    throw new Error("Cabins could not be deleted");
  }
  return id;
};

export const createCabin = async (payload) => {
  const imageName = `${Math.random()}-${payload.image.name}`.replaceAll("/", "");
  const imagePath = `https://hzlgbsbiuqlzvdphxvfo.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, payload.image);
  if (storageError) {
    console.error("Cabin image not uploaded", storageError.message);
    throw new Error("Cabin image not uploaded");
  }
  payload.image = imagePath;
  const { data, error } = await supabase.from("cabins").insert(payload).select();
  if (error) {
    console.error("Create Cabins Error", error.message);
    throw new Error("Cabins could not be created");
  }

  return data;
};

export default getCabins;
