import { createSlice } from '@reduxjs/toolkit'
import journeyService from '../services/journeys'
import { toggleLoading } from './loadingReducer'

// reducer that set the state for journey data
const journeysSlice = createSlice({
  name: 'journeys',
  initialState: [],
  reducers: {
    setJourneys(state, { payload }) {
      return payload
    },
  },
})

// dispatch the data to store
export const initializeJourneys = (
  currentPage,
  sortField,
  sortOrder,
  searchTerm
) => {
  return async (dispatch) => {
    try {
      // call axios
      const data = await journeyService.getAll(
        currentPage,
        sortField,
        sortOrder,
        searchTerm
      )
      dispatch(toggleLoading(false))
      dispatch(setJourneys(data))
      dispatch(toggleLoading(true))
    } catch (error) {
      console.error(error.message)
    }
  }
}
export const { setJourneys } = journeysSlice.actions
export default journeysSlice.reducer
