import { useDispatch } from 'react-redux'
import { initializeStations } from '../reducers/stationsReducer'
import { initializeJourneys } from '../reducers/journeyReducer'

export const useInitialization = (page) => {
  const dispatch = useDispatch()

  return () => {
    dispatch(initializeStations(page))
    dispatch(initializeJourneys())
  }
}
