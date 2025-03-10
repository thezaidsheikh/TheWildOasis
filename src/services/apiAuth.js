import supabase from './supabase'

export const loginAPI = async ({ email, password }) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      throw new Error(error.message)
    }
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getCurrentUserAPI = async () => {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data.user
}

export const logoutAPI = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export const signupAPI = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { fullName, avatar: '' } })
  if (error) throw new Error(error.message)
  return data
}
