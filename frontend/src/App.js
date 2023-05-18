import { Routes, Route, Link } from 'react-router-dom'

import JourneysList from './components/JourneysList'
import StationList from './components/StationsList'
import StationView from './components/StationView'

const App = () => {
  return (
    <div>
      <Link to="/">
        <button>Stations</button>
      </Link>
      <Link to="/journeys">
        <button>Journeys</button>
      </Link>
      <Routes>
        <Route path="/" element={<StationList />} />
        <Route path="/journeys" element={<JourneysList />} />
        <Route path="/stations/:id" element={<StationView />} />
      </Routes>
    </div>
  )
}

export default App
