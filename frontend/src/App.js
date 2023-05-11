import { useEffect, useState } from 'react'
import journeyServices from './services/journeys'
import stationsServices from './services/stations'
import JourneysList from './components/JourneysList'
import StationList from './components/StationsList'

const App = () => {
  const [journeysCurrentPage, setJourneysCurrentPage] = useState(0)
  const [stationsCurrentPage, setStationsCurrentPage] = useState(0)
  const [journeysTotalPages, setJourneysTotalPages] = useState(0)
  const [stationsTotalPages, setStationsTotalPages] = useState(0)
  const [journeys, setJourneys] = useState([])
  const [stations, setStations] = useState([])

  useEffect(() => {
    console.log('useEffect')
    journeyServices.getAll().then((journeys) => {
      setJourneys(journeys.data)
      setJourneysCurrentPage(journeys.currentPage)
      setJourneysTotalPages(journeys.totalPages)
    })
    stationsServices.getAll().then((stations) => {
      setStations(stations.data)
      setStationsCurrentPage(stations.currentPage)
      setStationsTotalPages(stations.totalPages)
    })
    // eslint-disable-next-line
  }, [])

  console.log('journeysCurrentPage', journeysCurrentPage)
  console.log('journeysTotalPages', journeysTotalPages)
  console.log('stationsCurrentPage', stationsCurrentPage)
  console.log('stationsTotalPages', stationsTotalPages)
  return (
    <div>
      <JourneysList journeys={journeys} />
      <StationList stations={stations} />
    </div>
  )
}

export default App
