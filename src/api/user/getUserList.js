import axios from 'axios'

export async function getUserList (params) {
  const { data: result } = await axios.get('/auth/api/v1/users', params)
  return result
}
