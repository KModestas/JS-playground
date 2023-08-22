import React, { useContext, useState, useEffect } from "react";
import { createStore } from "redux";
import { connect } from "react-redux";

// [Action Types]:
// multiple actions may use the same type, its a good idea to store them in a constant and reuse them
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// [Action Creators]:
// return an action which will be dispatched to the reducer
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// [Reducer]:
// is a pure function that updates the state based on the [type] of action dispatched
const counterReducer = (state = 0, action) => {
  // NOTE: in order for redux to recognise a state update, you must return a new object otherwise your listeners will not be notified and your components will not re-render
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

// [Store]:
// contains your entire redux state + returns methods like dispatch, subscribe, getState
export const store = createStore(counterReducer);

// Counter Component
// gets the return values of mapStateToProps, mapDispatchToProps passed to at as props from the [connect HOC]
const Counter = ({ count, increment, decrement }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

// mapStateToProps
const mapStateToProps = (state, ownProps) => ({
  count: state,
});

// mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

// [connect HOC]:
export const ReduxCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

// pseudoCode to mock the internals of the connect():
function mockConnect(mapStateToProps, mapDispatchToProps) {
  // connect() returns a function that is immediately invoked and recives our component we pass in
  return function (WrappedComponent) {
    // next function is the component we will end up rendering e.g. <ReduxCounter {...props} />, it returns a decorated version of our component and forwards the props we pass to it.
    return function ConnectedComponent(props) {
      // get the store from redux Provider
      const store = useContext();

      // mapStateToProps is invoked and our desired state is returned:
      const initialStateProps = mapStateToProps(store.getState(), props); // => { count: state }
      // mapDispatchToProps is invoked and passed the dispatch function:
      const dispatchProps = mapDispatchToProps(store.dispatch); // =>  { increment: () => dispatch(increment()) .... }

      // result of mapStateToProps is stored in internal state so that a re-render occurs whenever it changes
      const [stateProps, setstateProps] = useState(initialStateProps);

      useEffect(() => {
        // listener that is invoked by the reducer whenever state changes
        function listener() {
          const newStateToProps = mapStateToProps(store.getState(), props);

          // Shallow check to see if state has changed
          if (shallowEqual(newStateToProps, stateProps) === false) {
            // if state has changed, this component updates its internal state with the new state and re-renders. The leads to new props being passed to WrappedComponent which also causes it to re-render
            setstateProps(newStateToProps);
          }
        }

        // Subscribe the listener to state changes. Store keeps a list of all listeners for each connect component and invokes them whenever state changes
        const unsubscribe = store.subscribe(listener);

        return () => {
          // Unsubscribe when the component is unmounted
          unsubscribe();
        };
      }, [store, props, stateProps]);

      // Render the wrapped component with both the original props and the mapped props
      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

function shallowEqual(a, b) {
  // If both references are the same, they are definitely equal
  if (a === b) {
    return true;
  }

  // If either value is not an object and they are not strictly equal
  if ((typeof a !== "object" || typeof b !== "object") && a !== b) {
    return false;
  }

  // Get keys of both objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // If number of keys is different, they are not shallowly equal
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Iterate through keys of the first object
  for (let i = 0; i < keysA.length; i++) {
    // If keys don't match, or values associated with the keys don't match,
    // then the objects aren't shallowly equal
    if (!b.hasOwnProperty(keysA[i]) || a[keysA[i]] !== b[keysA[i]]) {
      return false;
    }
  }

  // If all checks passed, values are shallowly equal
  return true;
}
