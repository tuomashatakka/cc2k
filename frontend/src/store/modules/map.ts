/* eslint-disable no-unused-vars */
import { Dispatch, GetState, createSelector } from '@reduxjs/toolkit'
import type Api from '../../lib/api'
import { StateType } from '.'

type SkyScraperType = {
}

type SafeZoneType = {}

type DropZoneType = {}

export enum STATUS_TYPE {
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

const updateMapDimensionsAction = ({ width, height }: MapDataType) => ({
  type:     'map/updateDimensions',
  payload:  { width, height },
})

const updateMapNodesAction = (payload: MapDataType) => ({
  type:     'map/updateNodes',
  payload,
})

const updateMapFetchStateAction = (status: STATUS_TYPE, error: Error | null = null) => ({
  type:       'map/updateFetchState',
  payload:    { status, error },
})



const updateMapFetchState = (state: MapStateType, action: { payload: {status: STATUS_TYPE, error: Error | null }}) => ({ ...state, _state: [ action.payload.status, action.payload.error ]})

const updateMapDimensions = (state: MapStateType, action: { payload: MapDataType}) => {
  const { width, height } = action.payload
  return { ...state, width, height }
}

const updateMapNodes = (state: MapStateType, action: { payload: MapDataType}) => {
  const { dropZones, safeZones, skyScrapers } = action.payload
  return { ...state, dropZones, safeZones, skyScrapers }
}

export const updateMap = () => async (dispatch: Dispatch, getState: GetState<MapStateType>, { api }: { api: typeof Api }) => {
  dispatch(updateMapFetchStateAction(STATUS_TYPE.LOADING))
  try {
    const map = await api.getMap()
    dispatch(updateMapDimensionsAction(map))
    dispatch(updateMapNodesAction(map))
    dispatch(updateMapFetchStateAction(STATUS_TYPE.SUCCEEDED))
  }
  catch (err) {
    dispatch(updateMapFetchStateAction(STATUS_TYPE.FAILED, err as Error))
  }
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


export default function mapReducer (state: MapStateType, action: any) {
  switch (action.type) {
  case 'map/updateNodes':       return updateMapNodes(state, action)
  case 'map/updateDimensions':  return updateMapDimensions(state, action)
  case 'map/updateFetchState':  return updateMapFetchState(state, action)
  default:                      return initialState
  }
}
