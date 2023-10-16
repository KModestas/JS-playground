import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

// Custom hook for dispatching an Async thunk
export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get the dispatch function from the Redux store.
  const dispatch = useDispatch()

  // Memoise the function. This makes sure that if it is added as a dependency inside of another components useEffect, it will not needlessly trigger the useEffect on every render since the function will not be re-created after every render.
  const runThunk = useCallback(
    arg => {
      // Set the loading state to true as the thunk starts executing.
      setIsLoading(true)

      // Dispatch the thunk with the provided argument.
      dispatch(thunk(arg))
        .unwrap()
        .catch(err => {
          // If an error occurs, set the error state with the caught error.
          setError(err)
        })
        .finally(() => {
          // Once the thunk execution completes (success or error), set the loading state to false.
          setIsLoading(false)
        })
    },
    // If 'dispatch' or 'thunk' changes, the function will be recreated.
    [dispatch, thunk]
  )

  return [runThunk, isLoading, error]
}
