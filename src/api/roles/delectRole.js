import axios from 'axios'
export async function delectRole (roleId) {
  const { data: result } = await axios.delete(`/auth/api/v1/role/${roleId}`)
  return result
}
