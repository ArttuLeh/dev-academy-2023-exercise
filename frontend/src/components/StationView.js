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
} from '@mui/material'

const StationView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const station = useSelector(({ station }) => station)
  const isLoading = useSelector(({ loading }) => loading)

  useEffect(() => {
    dispatch(getStation(id))
  }, [dispatch, id])

  return (
    <div>
      {isLoading ? (
        <TableContainer component={Paper}>
          <h2>{station.data.Nimi} station information</h2>
          <Table>
            <TableHead>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Station ID
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Departure Station Count
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Return Station Count
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Average distance of starting from the station (km)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Average distance ending at the station (km)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  most popular return stations for journeys starting from the
                  station
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  most popular departure stations or journeys ending at the
                  station
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ boxShadow: 2 }}>
                <TableCell>{station.data.Osoite}</TableCell>
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
                  ).toFixed(1)}
                </TableCell>
                <TableCell align="right">
                  {(
                    station.returnStationDistance[0].avgCoveredDistance / 1000
                  ).toFixed(1)}
                </TableCell>
                <TableCell align="right">
                  {station.sortDepartureStation.map((s) => (
                    <li key={s._id}>
                      {s.count}, station ID: {s._id}
                    </li>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {station.sortReturnStation.map((s) => (
                    <li key={s._id}>
                      {s.count}, station ID: {s._id}
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
