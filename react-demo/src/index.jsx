import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";

import FunctionLifecycle from "./FunctionLifecycle";
import ClassLifecycle from "./ClassLifecycle";

import { store, ConnectedCounter } from "./Redux";

const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
    {/* <ClassLifecycle />
    <FunctionLifecycle /> */}
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
