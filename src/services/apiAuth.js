import { uploadImage } from './apiCabins'
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
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { fullName, avatar: '' } } })
  if (error) throw new Error(error.message)
  return data
}

export const updateUserAPI = async (payload) => {
  if (payload.password) payload = { password: payload.password }
  else payload.data = { fullName: payload.fullName }

  if (payload.image || payload.avatar) payload.data.avatar = await uploadImage(payload.image || payload.avatar, 'user')
  const { data: user, error } = await supabase.auth.updateUser(payload)
  if (error) throw new Error(error.message)
  return user.user
}
