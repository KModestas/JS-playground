import React, { useState } from 'react'
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// Create a slice of the global state
const counterSlice = createSlice({
  name: 'counter', // Used as a prefix for generated action types e.g. counter_increment
  initialState: 0, // Initial state value for this slice
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    addByAmount: (state, action) => state + action.payload
  }
})

// Async thunk example:
export const fetchUsers = createAsyncThunk('users/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
})
// 3 actions will automatically be created using the string we defined.
// - users/fetchData/pneding => will be disaptched as soon as dispatch our fetchUsers thunk
// - users/fetchData/rejected => will be dispatched if the promise returned from our function rejects
// - users/fetchData/fulfilled =>  will be dispatched if the promise returned from our function resolves

const userSlice = createSlice({
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

const { increment, decrement, addByAmount } = counterSlice.actions

// Set up the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    users: userSlice.reducer
  }
})

// Create a React component that interacts with the Redux store
export function ReduxToolkit() {
  // Access the specific slice of state. this hook is basically like connect() + mapStateToProps, it subscribes to changes then re-renders, passing your component the new state
  const count = useSelector(state => state.counter)
  const users = useSelector(state => state.users)
  // Get the dispatch function to dispatch actions to the Redux store
  const dispatch = useDispatch()
  // Local state for the input amount
  const [amount, setAmount] = useState(1)

  return (
    <main>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <div>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <button onClick={() => dispatch(addByAmount(amount))}>Add Amount</button>
      </div>

      <button onClick={() => dispatch(fetchUsers())}>Fetch Users Via Async Thunk</button>
      {!!users.data.length &&
        (users.status === 'loading' ? (
          <p>Loading ...</p>
        ) : (
          <ul>
            {users.data.map(({ name }) => {
              return <li key={name}>{name}</li>
            })}
          </ul>
        ))}
    </main>
  )
}
