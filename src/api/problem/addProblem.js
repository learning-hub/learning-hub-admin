import axios from 'axios'
export async function addProblem (type, params) {
  const { data: result } = await axios.post(`/judger/api/v1/problem/${type}`, params)
  return result
}
