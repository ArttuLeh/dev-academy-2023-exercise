import { createSlice } from '@reduxjs/toolkit'
import journeyService from '../services/journeys'

const journeysSlice = createSlice({
  name: 'journeys',
  initialState: [],
  reducers: {
    setJourneys(state, { payload }) {
      return payload
    },
  },
})

export const initializeJourneys = (currentPage) => {
  return async (dispatch) => {
    const data = await journeyService.getAll(currentPage)
    dispatch(setJourneys(data))
  }
}
export const { setJourneys } = journeysSlice.actions
export default journeysSlice.reducer
