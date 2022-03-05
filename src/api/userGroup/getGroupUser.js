import axios from 'axios'
export async function getGroupUser (groupId) {
  const { data: result } = await axios.get(`/auth/api/v1/userGroup/${groupId}`)
  return result
}
