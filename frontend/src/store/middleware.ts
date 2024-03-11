
import api from '../lib/api'
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

export default function middleware (getDefaultMiddleware: GetDefaultMiddleware) {
  const extraArgument = { api }
  const result        = getDefaultMiddleware({
    thunk: { extraArgument }
  })

  return result
}
