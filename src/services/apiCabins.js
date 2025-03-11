import supabase from './supabase'
const supabaseUrl = 'https://hzlgbsbiuqlzvdphxvfo.supabase.co'

export const getCabins = async () => {
  let { data, error } = await supabase.from('cabins').select('*')
  if (error) {
    console.error('Fetching Cabins Error', error.message)
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export const deleteCabin = async (id) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id)
  if (error) {
    console.error('Delete Cabins Error', error.message)
    throw new Error('Cabins could not be deleted')
  }
  return id
}

export const createCabin = async (payload) => {
  if (payload.id) return await editCabin(payload)
  payload.image = await uploadImage(payload.image, 'cabin')
  const { data, error } = await supabase.from('cabins').insert(payload).select()
  if (error) {
    console.error('Create Cabins Error', error.message)
    throw new Error('Cabins could not be created')
  }

  return data
}

export const editCabin = async (payload) => {
  payload.image = await uploadImage(payload.image, 'cabin')

  const { data, error } = await supabase.from('cabins').update(payload).eq('id', payload.id).select()
  if (error) {
    console.error('Create Cabins Error', error.message)
    throw new Error('Cabins could not be created')
  }

  return data
}

export const uploadImage = async (image, type) => {
  if ((image && image.name) || !image.startsWith(supabaseUrl)) {
    const imageName = `${Math.random()}-${image.name}`.replaceAll('/', '')
    let imagePath = `https://hzlgbsbiuqlzvdphxvfo.supabase.co/storage/v1/object/public`
    let db = ''

    if (type === 'cabin') {
      db = 'cabin-images'
      imagePath = `${imagePath}/cabin-images/${imageName}`
    } else if (type === 'user') {
      db = 'avatars'
      imagePath = `${imagePath}/avatars/${imageName}`
    } else return ''

    const { error: storageError } = await supabase.storage.from(db).upload(imageName, image)
    if (storageError) {
      console.error('Image not uploaded', storageError.message)
      throw new Error('Image not uploaded')
    }
    return imagePath
  }
  return image
}

export default getCabins
