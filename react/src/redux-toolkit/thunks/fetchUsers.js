import { createAsyncThunk } from '@reduxjs/toolkit'

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
