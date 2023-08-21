import React from "react";
import ReactDOM from "react-dom";

import FunctionLifecycle from "./FunctionLifecycle";
import ClassLifecycle from "./ClassLifecycle";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <FunctionLifecycle /> */}
        <ClassLifecycle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
