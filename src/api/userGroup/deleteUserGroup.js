import axios from 'axios'
export async function deleteUserGroup (groupId) {
  const { data: result } = await axios.delete(`/auth/api/v1//group/${groupId}`)
  return result
}
