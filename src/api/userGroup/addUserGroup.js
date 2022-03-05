import axios from 'axios'
export async function addUserGroup (params) {
  const { data: result } = await axios.post('/auth/api/v1/addGroup', params)
  return result
}
