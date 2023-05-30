import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

const StationData = ({ stations, handlePageChange }) => {
  const isLoading = useSelector(({ loading }) => loading) //loading state for handling loading image

  const headCell = [
    {
      id: 'Nimi',
      numeric: false,
      label: 'Station name',
    },
    {
      id: 'Osoite',
      numeric: true,
      label: 'Address',
    },
    {
      id: 'ID',
      numeric: true,
      label: 'Station ID',
    },
  ]

  return (
    <div>
      {isLoading && stations.data ? (
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
              {stations.data.map((station) => (
                <TableRow key={station._id} sx={{ boxShadow: 4 }}>
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
export default StationData
