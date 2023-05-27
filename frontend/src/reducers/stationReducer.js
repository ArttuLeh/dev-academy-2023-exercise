import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'
import { toggleLoading } from './loadingReducer'

// reducer that set the state for station data
const stationSlice = createSlice({
  name: 'station',
  initialState: [],
  reducers: {
    setStation(state, { payload }) {
      return payload
    },
  },
})

// dispatch the data to store
export const getStation = (id) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(false))
      // call axios
      const data = await stationsService.getStation(id)
      dispatch(setStation(data))
      dispatch(toggleLoading(true))
    } catch (error) {
      console.error(error.message)
    }
  }
}
export const { setStation } = stationSlice.actions
export default stationSlice.reducer
