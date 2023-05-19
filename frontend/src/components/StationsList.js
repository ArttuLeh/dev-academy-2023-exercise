import { Link } from 'react-router-dom'
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
import { initializeStations } from '../reducers/stationsReducer'

const StationList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const stations = useSelector(({ stations }) => stations)

  useEffect(() => {
    dispatch(initializeStations(currentPage))
  }, [dispatch, currentPage])

  const handlePageChange = (e, value) => {
    setCurrentPage(value)
  }

  return (
    <div>
      <h2>Helsinki city bike stations</h2>
      {stations.data ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Station name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Address
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Station ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.data.map((station) => (
                <TableRow key={station._id} sx={{ boxShadow: 2 }}>
                  <TableCell>
                    <Link to={`/stations/${station._id}`}>{station.Nimi}</Link>
                  </TableCell>
                  <TableCell align="right">
                    {station.Osoite} {station.Kaupunki}
                  </TableCell>
                  <TableCell align="right">{station.ID}</TableCell>
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
      <Stack
        spacing={3}
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <Pagination
          sx={{ display: 'flex', justifyContent: 'center' }}
          count={stations.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  )
}
export default StationList
