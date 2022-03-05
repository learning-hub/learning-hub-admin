import axios from 'axios'
export async function getRole (roleId) {
  const { data: result } = await axios.get(`/auth/api/v1/role/${roleId}`)
  return result
}
