import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SearchedStationsData = ({ stations }) => {
  const isLoading = useSelector(({ loading }) => loading) // loading state for handling loading image

  // array of objects for table cell
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

  if (isLoading && stations.success === false) {
    // show user if searched value not found
    return (
      <div>
        <Alert severity="error">
          <AlertTitle>Information not found</AlertTitle>
        </Alert>
      </div>
    )
  }

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
                  <TableCell className="row">
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
    </div>
  )
}
export default SearchedStationsData
