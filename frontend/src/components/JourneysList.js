import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { initializeJourneys } from '../reducers/journeyReducer'
import SearchedJourneysData from './SearchedJourneysData'
import JourneysData from './JourneysData'

// component that handle which jorneys show, searched or all
const JourneysList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1) // state for curren page
  const [sortField, setSortField] = useState('') // state for sortfield
  const [sortOrder, setSortOrder] = useState('') // state for sortorder (asc or desc)
  const [searchTerm, setSearchTerm] = useState('') // state for searching value
  const journeys = useSelector(({ journeys }) => journeys) // get the journeys data from the store

  useEffect(() => {
    const delay = setTimeout(() => {
      // delay for searching
      dispatch(
        // dispatch values to the reducer
        initializeJourneys(currentPage, sortField, sortOrder, searchTerm)
      )
    }, 1000)
    return () => clearTimeout(delay) // clear the timeout
  }, [dispatch, currentPage, sortField, sortOrder, searchTerm])

  const handlePageChange = (event, value) => {
    // handle page change and set the value
    event.preventDefault()
    setCurrentPage(value)
  }

  // hande sorting and set the value
  const handleSort = (value) => {
    if ((sortField === '' && sortOrder === '') || sortOrder === 'desc') {
      setSortField(value)
      setSortOrder('asc')
    } else {
      setSortField(value)
      setSortOrder('desc')
    }
  }

  // handle sort clear
  const handleClick = () => {
    setSortField('')
    setSortOrder('')
  }

  if (searchTerm) {
    // if the search term exist show the details of the searched journeys
    return (
      <div>
        <h2>Helsinki city bike journeys</h2>
        <Box>
          <TextField
            type="search"
            label="Search departure station by name"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            sx={{ width: 600 }}
          />
        </Box>
        <SearchedJourneysData
          journeys={journeys}
          handleSort={handleSort}
          handlePageChange={handlePageChange}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Helsinki city bike journeys</h2>
      <Box>
        <TextField
          type="search"
          label="Search departure station by name"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          sx={{ width: 600 }}
        />
      </Box>
      <Box style={{ paddingTop: 5 }}>
        <p>clear sorting before searching</p>
        <Button variant="contained" onClick={handleClick}>
          clear sorting
        </Button>
      </Box>
      <JourneysData
        journeys={journeys}
        sortOrder={sortOrder}
        sortField={sortField}
        handlePageChange={handlePageChange}
        handleSort={handleSort}
      />
    </div>
  )
}
export default JourneysList
