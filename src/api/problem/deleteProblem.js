import axios from 'axios'
export async function deleteProblem (problemId) {
  const { data: result } = await axios.delete(`/judger/api/v1/problem/${problemId}`)
  return result
}
