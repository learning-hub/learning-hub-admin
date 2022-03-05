import axios from 'axios'
export async function getProblem (problemId) {
  const { data: result } = await axios.get(`/judger/api/v1/problem/${problemId}`)
  return result
}
