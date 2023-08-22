import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export const store = createStore(counterReducer);

// Counter Component
const Counter = ({ count, increment, decrement }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

// mapStateToProps
const mapStateToProps = (state) => ({
  count: state,
});

// mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

// the connect HOC internally:
// - gains access to the store using useContext (from the Provider in App)
// - registers a listener callback using store.subscribe(listener). This listener will be invoked by the store whenever the reducer returns a new state object (after any state change).
// - if it has changed, the store will invoke ALL listeners (from every connected component)
// - each listener will invoke mapStateToProps(newState) with the new state. It will then do a shallow comparison to see if the current mapStateToProps is different from the new result.
// - the connect HOC is storing your mapSateToProps state internally using react state. The listener will setState to the new result
// - this will re-render the HOC internal state which will pass new props to your component, causing it to re-render with the new state.
export const ReduxCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

// pseudoCode for internal of the HOC component:
function ConnectHoC(mapStateToProps) {
  return function (WrappedComponent) {
    return function ConnectedComponent(props) {
      // Get the store from context
      const store = useContext();
      // store provided by the redux Provider

      // Initial mapping of state to props
      const initialStateToProps = mapStateToProps(store.getState(), props);

      const [mappedProps, setMappedProps] = useState(initialStateToProps);

      useEffect(() => {
        // This is our listener
        function handleStoreUpdate() {
          const newStateToProps = mapStateToProps(store.getState(), props);

          // Shallow check to see if props derived from state have changed
          if (newStateToProps !== mappedProps) {
            setMappedProps(newStateToProps);
          }
        }

        // Subscribe the listener to the store
        const unsubscribe = store.subscribe(handleStoreUpdate);

        return () => {
          // Unsubscribe when the component is unmounted
          unsubscribe();
        };
      }, [store, props, mappedProps]);

      // Render the wrapped component with both the original props and the mapped props
      return <WrappedComponent {...props} {...mappedProps} />;
    };
  };
}
