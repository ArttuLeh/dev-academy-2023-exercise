import axios from 'axios'
const baseUrl = '/api/stations'

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}
// eslint-disable-next-line
export default { getAll }
