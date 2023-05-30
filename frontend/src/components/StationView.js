import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getStation } from '../reducers/stationReducer'
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
import { toggleLoading } from '../reducers/loadingReducer'

// component that show the station information
// using material ui
const StationView = () => {
  const dispatch = useDispatch()
  const { id } = useParams() // get id value from stationList component
  const station = useSelector(({ station }) => station) // get the station info from store
  const isLoading = useSelector(({ loading }) => loading) // loading state for handling loading image

  useEffect(() => {
    // dispatch the id to the reducer everytime whenever id change
    dispatch(toggleLoading(false))
    dispatch(getStation(id))
  }, [dispatch, id])

  const headCell = [
    {
      id: 'address',
      numeric: false,
      lable: 'Address',
    },
    {
      id: 'ID',
      numeric: true,
      lable: 'Station ID',
    },
    {
      id: 'departureStationCount',
      numeric: true,
      lable: 'Departure Station Count',
    },
    {
      id: 'seturnStationCount',
      numeric: true,
      lable: 'Return Station Count',
    },
    {
      id: 'departureStationDistance',
      numeric: true,
      lable: 'Average distance of starting from the station (km)',
    },
    {
      id: 'returnStationDistance',
      numeric: true,
      lable: 'Average distance ending at the station (km)',
    },
    {
      id: 'sortDepartureStation',
      numeric: true,
      lable:
        'most popular return stations for journeys starting from the station',
    },
    {
      id: 'sortReturnStation',
      numeric: true,
      lable:
        'most popular departure stations or journeys ending at the station',
    },
  ]

  if (isLoading && station.success === false) {
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
      {isLoading && station.data ? (
        <TableContainer component={Paper}>
          <h2>{station.data.name} station information</h2>
          <Table>
            <TableHead>
              <TableRow sx={{ boxShadow: 4 }}>
                {headCell.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: 'bold' }}
                    align={headCell.numeric ? 'right' : 'left'}
                  >
                    {headCell.lable}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ boxShadow: 4 }}>
                <TableCell>{station.data.address}</TableCell>
                <TableCell align="right">{station.data.ID}</TableCell>
                <TableCell align="right">
                  {station.departureStationCount}
                </TableCell>
                <TableCell align="right">
                  {station.returnStationCount}
                </TableCell>
                <TableCell align="right">
                  {(
                    station.departureStationDistance[0].avgCoveredDistance /
                    1000
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {(
                    station.returnStationDistance[0].avgCoveredDistance / 1000
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {station.sortDepartureStation.map((s) => (
                    <li key={s._id}>
                      {s.count}, station name: {s._id}
                    </li>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {station.sortReturnStation.map((s) => (
                    <li key={s._id}>
                      {s.count}, station name: {s._id}
                    </li>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  )
}
export default StationView
