import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch