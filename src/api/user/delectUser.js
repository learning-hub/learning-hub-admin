import axios from 'axios'
export async function delectUser (userId) {
  const { data: result } = await axios.delete(`/auth/api/v1/user/${userId}`)
  return result
}
