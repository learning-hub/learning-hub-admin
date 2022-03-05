import axios from 'axios'

export async function editUser (pamars) {
  const { data: result } = await axios.put('/auth/api/v1/updateUser', pamars)
  return result
}
