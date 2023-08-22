import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Provider as ReduxToolKitProvider } from "react-redux";

import FunctionLifecycle from "./FunctionLifecycle";
import ClassLifecycle from "./ClassLifecycle";
import SyntheticEvents from "./SyntheticEvents";

// import { store, ReduxCounter } from "./Redux";
import { store, ReduxToolkitCounter } from "./ReduxToolkit";

const App = () => (
  <Provider store={store}>
    {/* <SyntheticEvents /> */}
    {/* <ReduxCounter /> */}
    <ReduxToolkitCounter />
    {/* <ClassLifecycle />
    <FunctionLifecycle /> */}
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
