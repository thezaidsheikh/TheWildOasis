import supabase from './supabase'

export const loginAPI = async ({ email, password }) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('Error by supabase', error)
      throw new Error(error.message)
    }
    return data
  } catch (error) {
    console.error('Catch ==>', error.message)
    throw new Error(error.message)
  }
}
