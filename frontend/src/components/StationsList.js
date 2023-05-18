import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeStations } from '../reducers/stationsReducer'

const StationList = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const stations = useSelector(({ stations }) => stations)

  useEffect(() => {
    console.log('use')
    dispatch(initializeStations(currentPage))
  }, [dispatch, currentPage])

  const handlePrevious = () => {
    setCurrentPage((p) => {
      if (p === 1) return p
      return p - 1
    })
  }

  const handleNext = () => {
    setCurrentPage((p) => {
      if (p === stations.totalPages) return p
      return p + 1
    })
  }

  return (
    <div>
      <h2>Helsinki city bike stations</h2>
      {stations.data ? (
        <div>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Town</th>
            <th>ID</th>
          </tr>

          {stations.data.map((station) => (
            <tr key={station.id}>
              <Link to={`/stations/${station.id}`}>
                <td>{station.Nimi}</td>
              </Link>
              <td>{station.Adress}</td>
              <td>{station.Kaupunki}</td>
              <td>{station.ID}</td>
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
          disabled={currentPage === stations.totalPages}
          onClick={handleNext}
        >
          next
        </button>
      </footer>
    </div>
  )
}
export default StationList
