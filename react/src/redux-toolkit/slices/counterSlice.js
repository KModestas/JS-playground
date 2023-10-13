import { createSlice } from '@reduxjs/toolkit'

// Create a slice of the global state
export const counterSlice = createSlice({
  name: 'counter', // Used as a prefix for generated action types e.g. counter_increment
  initialState: 0, // Initial state value for this slice
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    addByAmount: (state, action) => state + action.payload
  }
})

export const { increment, decrement, addByAmount } = counterSlice.actions
