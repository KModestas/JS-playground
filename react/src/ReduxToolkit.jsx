// Required imports
import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// 1. Create a slice of the global state
const counterSlice = createSlice({
  name: "counter", // Used as a prefix for generated action types e.g. counter_increment
  initialState: 0, // Initial state value for this slice
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    addByAmount: (state, action) => state + action.payload,
  },
});

// Exporting actions for use within components
export const { increment, decrement, addByAmount } = counterSlice.actions;

// 2. Set up the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Connect our slice reducer to the store
  },
});

// 3. Create a React component that interacts with the Redux store
export function ReduxToolkitCounter() {
  // Access the specific slice of state. this hook is basically like connect() + mapStateToProps, it subscribes to changes then re-renders, passing your component the new state
  const count = useSelector((state) => state.counter);
  // Get the dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // Local state for the input amount
  const [amount, setAmount] = useState(1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(addByAmount(amount))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
