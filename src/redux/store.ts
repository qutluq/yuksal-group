import { configureStore } from '@reduxjs/toolkit'

import localeReducer from './features/locale/locale-slice'

export const store = configureStore({
  reducer: {
    localeManager: localeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
