import axios from 'axios'
export async function distributionUserRoles (userid, params) {
  console.log(params)
  const { data: result } = await axios.put(`/auth/api/v1/user/${userid}/role`, { role_id: params })
  return result
}
