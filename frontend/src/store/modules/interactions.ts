/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit'
import { StateType } from '.'


type Nullable<T> = T | null

enum ACTION_METHOD_TYPE {
  PICKUP,
  DROP,
  EJECT,
  MOVE,
  DESTROY,
}

type CurrentActionType = {
  target: any,
  method: ACTION_METHOD_TYPE
}

type SelectionIdentifierType = {
  instance: string,
  id:       number,
}

export type InteractionStateType = {
  selection:      Array<SelectionIdentifierType>,
  currentAction:  Nullable<CurrentActionType>,
}


export const initialState: InteractionStateType = {
  selection:      [],
  currentAction:  null,
}

// const addToSelected       = (payload: SelectionIdentifierType) => ({ type: 'interface/addToSelected', payload })
// const removeFromSelected  = (payload) => ({ type: 'interface/removeFromSelected', payload })

// const deselectAll = () => ({
//   type:       'interface/setSelected',
//   payload:    []
// })

const updateSelected = (state: InteractionStateType, selection: Array<SelectionIdentifierType>) => ({ ...state, selection })

export const selectInteraction    = (state: StateType) => state.interaction
export const selectSelection      = (map: InteractionStateType) => map.selection
export const selectCurrentAction  = (map: InteractionStateType) => map.currentAction

export const selectInteractionSelection  = createSelector(
  [ selectInteraction ], selectSelection)

export const selectInteractionAction = createSelector(
  [ selectInteraction ], selectCurrentAction)

export default function interactionReducer (state: InteractionStateType, action: any) {
  switch (action.type) {
  case 'interface/deselectAll':         return updateSelected(state, [])
  case 'interface/addToSelected':       return updateSelected(state, [ ...state.selection, action.payload ])
  case 'interface/removeFromSelected':  {
    const selection = [ ...state.selection ]
    const index = selection.findIndex((item) => item.id === action.payload.id && action.payload.instance === item.instance)
    if (index > -1)
      selection.splice(index, 1)
    return updateSelected(state, selection)
  }
  default:                      return initialState
  }
}
