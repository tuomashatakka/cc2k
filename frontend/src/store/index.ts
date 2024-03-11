import { configureStore } from '@reduxjs/toolkit'

import reducer from './modules'
import api from '../lib/api'
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'


const middleware = (getDefaultMiddleware: GetDefaultMiddleware) => {
  const extraArgument = { api }
  const result        = getDefaultMiddleware({
    thunk: { extraArgument }
  })

  return result
}

const store = configureStore({
  reducer,
  middleware,
})

export default store
