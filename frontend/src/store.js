import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './reducers/stationsReducer'
import stationReducer from './reducers/stationReducer'
import journeyReducer from './reducers/journeyReducer'
import loadingReducer from './reducers/loadingReducer'

const store = configureStore({
  reducer: {
    stations: stationsReducer,
    station: stationReducer,
    journeys: journeyReducer,
    loading: loadingReducer,
  },
})
export default store
