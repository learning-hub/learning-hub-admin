import axios from 'axios'
export async function getGroup (groupId) {
  const { data: result } = await axios.get(`/auth/api/v1/group/${groupId}`)
  return result
}
