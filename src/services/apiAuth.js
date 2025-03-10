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

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return data
}
