import { useDispatch, useSelector } from 'react-redux'
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Stack,
  Pagination,
  Box,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { initializeJourneys } from '../reducers/journeyReducer'

const JourneysList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const journeys = useSelector(({ journeys }) => journeys)

  useEffect(() => {
    dispatch(initializeJourneys(currentPage))
  }, [dispatch, currentPage])

  const handlePageChange = (e, value) => {
    setCurrentPage(value)
  }

  return (
    <div>
      <h2>Helsinki city bike journeys</h2>
      {journeys.data ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Departure station id
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Departure station name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Return station name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Covered distance (km)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Duration (min)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journeys.data.map((journey) => (
                <TableRow key={journey._id} sx={{ boxShadow: 2 }}>
                  <TableCell>{journey.Departure_station_id}</TableCell>
                  <TableCell align="right">
                    {journey.Departure_station_name}
                  </TableCell>
                  <TableCell align="right">
                    {journey.Return_station_name}
                  </TableCell>
                  <TableCell align="right">
                    {(journey.Covered_distance_m / 1000).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {(journey.Duration_sec / 60).toFixed()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Pagination
          sx={{ display: 'flex', justifyContent: 'center' }}
          count={journeys.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  )
}
export default JourneysList
