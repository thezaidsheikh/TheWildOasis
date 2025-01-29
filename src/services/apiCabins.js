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
  const { data, error } = await supabase.from("cabins").insert(payload).select();
  if (error) {
    console.error("Create Cabins Error", error.message);
    throw new Error("Cabins could not be created");
  }
  return data;
};

export default getCabins;
