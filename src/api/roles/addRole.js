import axios from 'axios'
export async function addRole (params) {
  const { data: result } = await axios.post('/auth/api/v1/addRole', params)
  return result
}
