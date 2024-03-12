import { Selector } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './hooks'
import { StateType } from './modules'

export const useStateAndDispatch = (selector: Selector) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selector)
  return [ state, dispatch ]
}

export const useAppData = <R>(selector: Selector<StateType, R>) => {
  const state = useAppSelector(selector)
  return state
}

export const useDispatch = () => {
  const dispatch = useAppDispatch()
  return dispatch
}
