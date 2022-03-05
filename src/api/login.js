import axios from 'axios'
export async function login (uuid, primise) {
  const { data: result } = await axios.post(`/auth/api/v1/login?uuid=${uuid}`, primise)
  return result
}
