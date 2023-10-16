import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increment, decrement, addByAmount } from './redux-toolkit/slices/counterSlice'
import { fetchUsers } from './redux-toolkit/thunks/fetchUsers'

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
