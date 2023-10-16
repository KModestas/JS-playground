import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counterSlice'
import { userSlice } from './slices/usersSlice'

// Set up the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    users: userSlice.reducer
  }
})
