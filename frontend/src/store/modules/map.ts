import { ActionReducerMapBuilder, Dispatch, GetState, createSelector, createSlice } from "@reduxjs/toolkit"
import type Api from '../../lib/api'
import { createSelectorHook } from "react-redux"
import { StateType } from "."

type SkyScraperType = {
}

type SafeZoneType = {}

type DropZoneType = {}

enum STATUS_TYPE {
  UNINITIALIZED,
  LOADING,
  SUCCEEDED,
  FAILED,
}

type MapDataType = {
  width:        number,
  height:       number,
  skyScrapers:  Array<SkyScraperType>,
  safeZones:    Array<SafeZoneType>,
  dropZones:    Array<DropZoneType>,
}

export type MapStateType = MapDataType & {
  _state:       [ STATUS_TYPE, Error | null ]
}

export const initialState: MapStateType = {
  _state:       [ STATUS_TYPE.UNINITIALIZED, null ],
  width:        0,
  height:       0,
  skyScrapers:  [],
  safeZones:    [],
  dropZones:    [],
}

const updateMapDimensionsAction = (payload: MapDataType) => ({
  type: 'map/updateDimensions',
  payload,
})

const updateMapNodesAction = (payload: MapDataType) => ({
  type: 'map/updateNodes',
  payload,
})

const updateMapFetchStateAction = (status: STATUS_TYPE, error: Error | null = null) => ({
  type: 'map/updateNodes',
  payload: { status, error },
})

const updateMapFetchState = (state: MapStateType, action: { payload: {status: STATUS_TYPE, error: Error | null }}) => {
  state._state = [ action.payload.status, action.payload.error ]
}

const updateMapDimensions = (state: MapStateType, action: { payload: MapDataType}) => {
  state.width = action.payload.width
  state.height = action.payload.height
}

const updateMapNodes = (state: MapStateType, action: { payload: MapDataType}) => {
  state.skyScrapers = action.payload.skyScrapers
  state.safeZones   = action.payload.safeZones
  state.dropZones   = action.payload.dropZones
}

export const updateMap = () => {
  return async (dispatch: Dispatch, getState: GetState<MapStateType>, { api }: { api: typeof Api }) => {
    dispatch(updateMapFetchStateAction(STATUS_TYPE.LOADING))
    try {
      const map = await api.getMap()
      console.info({map})
      dispatch(updateMapDimensionsAction(map))
      dispatch(updateMapNodesAction(map))
      dispatch(updateMapFetchStateAction(STATUS_TYPE.SUCCEEDED))
    }
    catch (err) {
      dispatch(updateMapFetchStateAction(STATUS_TYPE.FAILED, err as Error))
    }
  }
}

const reducers = {
  updateMapFetchState,
  updateMapDimensions,
  updateMapNodes,
}

export const selectMapData        = (state: StateType) => state.map
export const selectDimensions     = (map: MapStateType) => [ map.width, map.height ]
export const selectSkyScrapers    = (map: MapStateType) => map.skyScrapers
export const selectDropZones      = (map: MapStateType) => map.dropZones
export const selectSafeZones      = (map: MapStateType) => map.safeZones
export const selectFetchState     = (map: MapStateType) => map._state[0]

export const selectMapDimensions  = createSelector(
  [ selectMapData ], selectDimensions)

export const selectMapSkyScrapers = createSelector(
  [ selectMapData ], selectSkyScrapers)

export const selectMapDropZones = createSelector(
  [ selectMapData ], selectDropZones)

export const selectMapSafeZones = createSelector(
  [ selectMapData ], selectSafeZones)

export const selectMapFetchState = createSelector(
  [ selectMapData ], selectFetchState)


// const extraReducers = (builder: ActionReducerMapBuilder<MapStateType>, ...a: any[]) => {

//   console.warn("BUILDER", builder, a)

//   builder
//     .addCase(fetchMap.pending, (state, action) => {
//       state._state = [ STATUS_TYPE.LOADING, null ]
//     })

//     .addCase(fetchMap.fulfilled, (state, action, ...args) => {
//       console.warn(state, action , args, "!!!!")
//       state._state  = [ STATUS_TYPE.SUCCEEDED, null ]

//       // @ts-ignore
//       state.height  = action.payload?.height || 0

//       // @ts-ignore
//       state.width   = action.payload?.width || 0
//     })
//     .addCase(fetchMap.rejected, (state, action) => {
//       // @ts-ignore
//       state._state  = [ STATUS_TYPE.FAILED, action.error ]
//       state.width   = 0
//       state.height  = 0
//     })
// }

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers,
  // extraReducers,
})


const actions = { ...mapSlice.actions }

export {
  actions,
  reducers,
  mapSlice,
}

export default mapSlice.reducer
