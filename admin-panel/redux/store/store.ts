import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Create a dummy reducer to remove warning
const dummyReducer = (state = {}) => state

const rootReducer = combineReducers({
  dummy: dummyReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch