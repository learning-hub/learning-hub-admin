import axios from 'axios'
export async function singleUser (userId) {
  const { data: result } = await axios.get(`/auth/api/v1/user/${userId}`)
  return result
}
