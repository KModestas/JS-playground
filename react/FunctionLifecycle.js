import React, { useState, useEffect } from "react";

function FunctionLifecycle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ComponentDidMount
    console.log("Component has mounted");

    return () => {
      // ComponentWillUnmount
      console.log("Component will unmount");
    };
  }, []); // only run once

  useEffect(() => {
    // ComponentDidUpdate (excluding the first render)
    // If we want to exclude initial render we can do it conditionally like here (or create a custom hook)
    if (count > 0) {
      console.log(`Count has updated to: ${count}`);
    }

    return () => {
      // ComponentWillUnmount + cleanup previous useEffect
      console.log("Cleanup");
    };
  }, [count]); // run once + whenever count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increase Count
      </button>
    </div>
  );
}

export default FunctionLifecycle;
