import axios from 'axios'

export async function getRolesList (params) {
  const { data: result } = await axios.get('/auth/api/v1/roles', params)
  return result
}
