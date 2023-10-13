import { createSlice } from '@reduxjs/toolkit'

import { fetchUsers } from '../thunks/fetchUsers'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: null,
    error: null
  },
  reducers: {},
  // extraReducers allows you to respond to dispatched actions that are not part of this slice itself. For example, you may want to reset the state of a slice when an particular action in another slice gets dispatched.
  // In this case we add the actions created by our thunk so that when they are disaptched, we can update our state in response
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // data returned from your fulfilled thunk we automatically be assigned to the payload property:
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        // if error was thrown, the error will be made avaliable:
        state.error = action.error.message
      })
  }
})
