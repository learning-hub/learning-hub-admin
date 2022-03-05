import axios from 'axios'
export async function editUserGroup (groupId, params) {
  const { data: result } = await axios.put(`/auth/api/v1/group/${groupId}`, params)
  return result
}
