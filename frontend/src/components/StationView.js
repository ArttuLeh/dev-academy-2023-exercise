import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getStation } from '../reducers/stationReducer'

const StationView = ({ stations }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const station = useSelector(({ station }) => station)

  useEffect(() => {
    dispatch(getStation(id))
  }, [dispatch, id])

  return (
    <div>
      {station.data ? (
        <div>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>ID</th>
            <th>Departure Station Count</th>
            <th>Return Station Count</th>
            <th>Average distance of starting from the station</th>
            <th>Average distance ending at the station</th>
            <th>
              most popular return stations for journeys starting from the
              station
            </th>
            <th>
              most popular departure stations or journeys ending at the station
            </th>
          </tr>
          <tr>
            <td>{station.data.Nimi}</td>
            <td>{station.data.Osoite}</td>
            <td>{station.data.ID}</td>

            <td>{station.stationsCount.departureStationCount}</td>
            <td>{station.stationsCount.returnStationCount}</td>
            <td>{station.departureStationDistance[0].avgCoveredDistance}</td>
            <td>{station.returnStationDistance[0].avgCoveredDistance}</td>
            <td>
              {station.sortDepartureStation.map((s) => (
                <li key={s._id}>
                  {s.count} station ID{s._id}
                </li>
              ))}
            </td>
            <td>
              {station.sortReturnStation.map((s) => (
                <li key={s._id}>
                  {s.count} station ID{s._id}
                </li>
              ))}
            </td>
          </tr>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}
export default StationView
