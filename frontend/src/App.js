import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Container, Toolbar, Button } from '@mui/material'

import JourneysList from './components/JourneysList'
import StationList from './components/StationsList'
import StationView from './components/StationView'
import Home from './components/Home'
import Notification from './components/Notification'
import SearchedJourneysData from './components/SearchedJourneysData'

const App = () => {
  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/stations">
            Stations
          </Button>
          <Button color="inherit" component={Link} to="/journeys">
            Journeys
          </Button>
        </Toolbar>
      </AppBar>
      <Notification />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/stations" element={<StationList />} />
          <Route path="/journeys" element={<JourneysList />} />
          <Route path="/journeys/search" element={<SearchedJourneysData />} />
          <Route path="/stations/:id" element={<StationView />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
