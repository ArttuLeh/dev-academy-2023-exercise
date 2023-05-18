import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeJourneys } from '../reducers/journeyReducer'

const JourneysList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const journeys = useSelector(({ journeys }) => journeys)

  useEffect(() => {
    console.log('use')
    dispatch(initializeJourneys(currentPage))
  }, [dispatch, currentPage])

  const handlePrevious = () => {
    setCurrentPage((p) => {
      if (p === 1) return p
      return p - 1
    })
  }

  const handleNext = () => {
    setCurrentPage((p) => {
      if (p === journeys.totalPages) return p
      return p + 1
    })
  }

  return (
    <div>
      <h2>Helsinki city bike journeys</h2>
      {journeys.data ? (
        <div>
          <tr>
            <th>Departure station id</th>
            <th>Departure station name</th>
            <th>Covered distance m</th>
            <th>Duration sec</th>
          </tr>

          {journeys.data.map((journey) => (
            <tr key={journey.id}>
              <td>{journey.Departure_station_id}</td>
              <td>{journey.Departure_station_name}</td>
              <td>{journey.Covered_distance_m}</td>
              <td>{journey.Duration_sec}</td>
            </tr>
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
      <footer>
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          previous
        </button>
        <button
          disabled={currentPage === journeys.totalPages}
          onClick={handleNext}
        >
          next
        </button>
      </footer>
    </div>
  )
}
export default JourneysList
