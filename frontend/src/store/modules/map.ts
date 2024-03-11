import { ActionReducerMapBuilder, Dispatch, GetState, createSlice } from "@reduxjs/toolkit"
import type Api from '../../lib/api'

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
    const map = await api.getMap()
    console.info({map})
    await dispatch(updateMapDimensionsAction(map))
    await dispatch(updateMapNodesAction(map))
  }
}

const reducers = {
  updateMapDimensions,
  updateMapNodes,
}

const extraReducers = (builder: ActionReducerMapBuilder<MapStateType>, ...a: any[]) => {

  console.warn("BUILDER", builder, a)
  // builder
  //   .addCase(fetchMap.pending, (state, action) => {
  //     state._state = [ STATUS_TYPE.LOADING, null ]
  //   })

  //   .addCase(fetchMap.fulfilled, (state, action, ...args) => {
  //     console.warn(state, action , args, "!!!!")
  //     state._state  = [ STATUS_TYPE.SUCCEEDED, null ]

  //     // @ts-ignore
  //     state.height  = action.payload?.height || 0

  //     // @ts-ignore
  //     state.width   = action.payload?.width || 0
  //   })
  //   .addCase(fetchMap.rejected, (state, action) => {
  //     // @ts-ignore
  //     state._state  = [ STATUS_TYPE.FAILED, action.error ]
  //     state.width   = 0
  //     state.height  = 0
  //   })
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers,
  extraReducers,
})

const actions = { ...mapSlice.actions }

export {
  actions,
  reducers,
  mapSlice,
}

export default mapSlice.reducer
