import mapReducer, { MapStateType, initialState as initialMapState } from './map'
import interactionReducer, { InteractionStateType, initialState as initialInteractionState } from './interactions'

export type StateType = {
  map:          MapStateType,
  interaction:  InteractionStateType,
  drones:       [],
  packages:     [],
}

export const initialState: StateType = {
  map:          initialMapState,
  interaction:  initialInteractionState,
  packages:     [],
  drones:       [],
}

const reducers = {
  map: mapReducer,
  interaction: interactionReducer,
}

export default reducers
