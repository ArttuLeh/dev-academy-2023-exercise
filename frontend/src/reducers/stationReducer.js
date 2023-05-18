import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'

const slice = createSlice({
  name: 'stations',
  initialState: [],
  reducers: {
    setStation(state, { payload }) {
      return payload
    },
  },
})

export const getStation = (id) => {
  console.log(id)
  return async (dispatch) => {
    const data = await stationsService.getStation(id)
    console.log('reducer station', data)
    dispatch(setStation(data))
  }
}
export const { setStation } = slice.actions
export default slice.reducer
