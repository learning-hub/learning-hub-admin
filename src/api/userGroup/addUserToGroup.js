import axios from 'axios'
export async function addUserToGroup (params) {
  const { data: result } = await axios.post('/auth/api/v1/addUserToGroup', params)
  return result
}
