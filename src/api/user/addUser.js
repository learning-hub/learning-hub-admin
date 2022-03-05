import axios from 'axios'

export async function addUser (params) {
  const { data: result } = await axios.post('/auth/api/v1/user', params)
  return result
}
