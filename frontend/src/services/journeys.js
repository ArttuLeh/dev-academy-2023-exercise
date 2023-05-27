import axios from 'axios'
const baseUrl = '/api/journeys'

//axios fetch the data from backend
const getAll = async (currentPage, sortField, sortOrder, searchTerm) => {
  const request = await axios.get(
    `${baseUrl}?page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}&search=${searchTerm}`
  )
  return request.data
}
// eslint-disable-next-line
export default { getAll }
