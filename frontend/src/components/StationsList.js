import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { initializeStations } from '../reducers/stationsReducer'
import SearchedStationsData from './SearchedStationData'
import StationsData from './StationsData'
import { toggleLoading } from '../reducers/loadingReducer'

// component that lists all the stations
// using material ui
const StationList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1) // state for handling current page
  const [searchTerm, setSearchTerm] = useState('') // state for searching value
  const stations = useSelector(({ stations }) => stations) // get the stations data from the store
  const isLoading = useSelector(({ loading }) => loading) //loading state for handling loading image

  useEffect(() => {
    dispatch(toggleLoading(false))
    const delay = setTimeout(() => {
      // dispatch the currentpage value to the reducer whenever user change the page
      dispatch(initializeStations(currentPage, searchTerm))
    }, 1000)
    return () => clearTimeout(delay)
  }, [dispatch, currentPage, searchTerm])

  const handlePageChange = (e, value) => {
    // handle page change and set the value
    setCurrentPage(value)
  }

  if (searchTerm) {
    return (
      <div>
        <h2>Helsinki city bike stations</h2>
        <Box>
          <TextField
            id="search"
            type="search"
            label="Search station by name"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            sx={{ width: 600 }}
          />
        </Box>
        <SearchedStationsData
          stations={stations}
          handlePageChange={handlePageChange}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Helsinki city bike stations</h2>
      <Box>
        <TextField
          id="search"
          type="search"
          label="Search station by name"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          sx={{ width: 600 }}
        />
      </Box>
      <StationsData stations={stations} handlePageChange={handlePageChange} />
    </div>
  )
}
export default StationList
