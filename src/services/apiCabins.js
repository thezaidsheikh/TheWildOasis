import supabase from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Fetching Cabins Error", error.message);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log("Delete Cabins Error", error.message);
    throw new Error("Cabins could not be deleted");
  }
  return id;
};

export default getCabins;
