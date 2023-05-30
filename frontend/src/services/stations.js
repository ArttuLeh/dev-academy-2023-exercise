import axios from 'axios'
const baseUrl = '/api/stations'

//axios fetch the data from backend
const getAll = async (currentPage, searchTerm) => {
  const request = await axios.get(
    `${baseUrl}?page=${currentPage}&search=${searchTerm}`
  )
  return request.data
}
//fetch the specific station data from backend
const getStation = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}
// eslint-disable-next-line
export default { getAll, getStation }
