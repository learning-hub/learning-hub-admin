import axios from 'axios'
export async function delectUserToGroup (params) {
  const { data: result } = await axios.delete('/auth/api/v1/deleteUserToGroup', params)
  return result
}
