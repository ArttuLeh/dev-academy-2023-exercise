import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './reducers/stationsReducer'
import stationReducer from './reducers/stationReducer'
import journeyReducer from './reducers/journeyReducer'

const store = configureStore({
  reducer: {
    stations: stationsReducer,
    station: stationReducer,
    journeys: journeyReducer,
  },
})
export default store
