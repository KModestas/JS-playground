// import React from "react";
// import ReactDOM from "react-dom";
// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Provider, connect } from "react-redux";

// // Slice
// const counterSlice = createSlice({
//   name: "counter",
//   initialState: 0,
//   reducers: {
//     increment: (state, action) => state + action.payload,
//     decrement: (state, action) => state - action.payload,
//   },
// });

// const { actions, reducer } = counterSlice;
// const { increment, decrement } = actions;

// // Store
// export const store = configureStore({
//   reducer: {
//     counter: reducer,
//   },
// });

// // Counter Component
// const Counter = ({ count, increment, decrement }) => (
//   <div>
//     <p>Count: {count}</p>
//     <button onClick={() => increment(1)}>Increment by 1</button>
//     <button onClick={() => increment(5)}>Increment by 5</button>
//     <button onClick={() => decrement(1)}>Decrement by 1</button>
//     <button onClick={() => decrement(5)}>Decrement by 5</button>
//   </div>
// );

// // mapStateToProps and mapDispatchToProps
// const mapStateToProps = (state) => ({
//   count: state.counter,
// });

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

// export const ConnectedCounter = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter);

// // App
// const App = () => (
//   <Provider store={store}>
//     <ConnectedCounter />
//   </Provider>
// );

// ReactDOM.render(<App />, document.getElementById("root"));
