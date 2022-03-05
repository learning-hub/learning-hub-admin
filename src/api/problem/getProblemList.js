import axios from 'axios'
export async function getProblemList (params) {
  const { data: result } = await axios.get('/judger/api/v1/problem', params)
  return result
}
