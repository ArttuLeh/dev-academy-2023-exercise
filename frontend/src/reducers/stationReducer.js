import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'
import { toggleLoading } from './loadingReducer'

const stationSlice = createSlice({
  name: 'station',
  initialState: [],
  reducers: {
    setStation(state, { payload }) {
      return payload
    },
  },
})

export const getStation = (id) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(false))
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
