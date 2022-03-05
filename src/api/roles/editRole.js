import axios from 'axios'
export async function editRole (roleId, params) {
  const { data: result } = await axios.put(`/auth/api/v1/role/${roleId}`, params)
  return result
}
