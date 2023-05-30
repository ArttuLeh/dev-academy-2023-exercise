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
  Alert,
  AlertTitle,
} from '@mui/material'
import { useSelector } from 'react-redux'

//component that show the searched data
const SearchedJourneysData = ({ journeys, handlePageChange }) => {
  const isLoading = useSelector(({ loading }) => loading) // loading state for handling loading image

  // array of objects for table cell
  const headCell = [
    {
      id: 'Departure_station_id',
      numeric: false,
      label: 'Departure station id',
    },
    {
      id: 'Departure_station_name',
      numeric: true,
      label: 'Departure station name',
    },
    {
      id: 'Return_station_name',
      numeric: true,
      label: 'Return station name',
    },
    {
      id: 'Covered_distance_m',
      numeric: true,
      label: 'Covered distance (km)',
    },
    {
      id: 'Duration_sec',
      numeric: true,
      label: 'Duration (min)',
    },
  ]

  if (isLoading && journeys.success === false) {
    // show user if searched value not found
    return (
      <div>
        <Alert severity="error">
          <AlertTitle>
            Information not found, try again a different name
          </AlertTitle>
        </Alert>
      </div>
    )
  }

  return (
    <div>
      {isLoading && journeys.sortedData[0].data ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ boxShadow: 4 }}>
                {headCell.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: 'bold' }}
                    align={headCell.numeric ? 'right' : 'left'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {journeys.sortedData[0].data.map((journey) => (
                <TableRow key={journey._id} sx={{ boxShadow: 4 }}>
                  <TableCell>{journey.Departure_station_id}</TableCell>
                  <TableCell className="row" align="right">
                    {journey.Departure_station_name}
                  </TableCell>
                  <TableCell align="right">
                    {journey.Return_station_name}
                  </TableCell>
                  <TableCell align="right">
                    {(journey.Covered_distance_m / 1000).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {(journey.Duration_sec / 60).toFixed(2)}
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
      {
        <Stack spacing={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={journeys.totalPages}
            onChange={handlePageChange}
          />
        </Stack>
      }
    </div>
  )
}
export default SearchedJourneysData
