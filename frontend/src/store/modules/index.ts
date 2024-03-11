
import mapReducer, { MapStateType, initialState as initialMapState } from './map'

export type StateType = {
  map:      MapStateType,
  drones:   [],
  packages: [],
}

export const initialState: StateType = {
  map:      initialMapState,
  drones:   [],
  packages: [],
}

const reducers = {
  map: mapReducer,
}

export default reducers
