import axios from 'axios'
export async function getUserGroupList (params) {
  const { data: result } = await axios.get('/auth/api/v1/groups', params)
  return result
}
