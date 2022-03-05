import axios from 'axios'

export async function editProblem (problemID, type, params) {
  const { data: result } = await axios.put(`/judger/api/v1/problem/${type}/${problemID}`, params)
  return result
}
