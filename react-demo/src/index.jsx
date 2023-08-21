import React from "react";
import ReactDOM from "react-dom";

import FunctionLifecycle from "./FunctionLifecycle";

class App extends React.Component {
  render() {
    return (
      <div>
        <FunctionLifecycle />
        {/* <ClassLifecycle /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
