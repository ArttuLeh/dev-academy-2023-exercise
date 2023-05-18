import axios from 'axios'
const baseUrl = '/api/journeys'

const getAll = async (currentPage) => {
  const request = await axios.get(`${baseUrl}?page=${currentPage}`)
  return request.data
}
// eslint-disable-next-line
export default { getAll }
