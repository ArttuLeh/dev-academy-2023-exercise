import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './reducers/stationsReducer'
import stationReducer from './reducers/stationReducer'
import journeyReducer from './reducers/journeyReducer'
import loadingReducer from './reducers/loadingReducer'
import notificationReducer from './reducers/notificationReducer'

// store the all states
const store = configureStore({
  reducer: {
    stations: stationsReducer,
    station: stationReducer,
    journeys: journeyReducer,
    loading: loadingReducer,
    notification: notificationReducer,
  },
})
export default store
