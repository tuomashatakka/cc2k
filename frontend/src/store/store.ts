import { configureStore } from '@reduxjs/toolkit'

import reducer from './modules'
import middleware from './middleware'

const store = configureStore({
  reducer,
  middleware,
})

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred state type: {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof store.getState>

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof store.dispatch

export default store
