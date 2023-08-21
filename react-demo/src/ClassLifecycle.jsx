import React, { Component } from "react";

class ClassLifecycle extends Component {
  constructor(props) {
    super(props);
    console.log("1. constructor()");
    this.state = {
      counter: 0,
    };
  }

  // Called before every single render (even initial)
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("2. ** getDerivedStateFromProps()", nextProps, nextState);
    // Return an object to update state or null to not update state
    return null;
  }

  componentDidMount() {
    console.log("4. componentDidMount()");

    // comment this in to trigger the rest of the life cycle methods:
    // this.setState({ counter: 1 });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. shouldComponentUpdate()", nextProps, nextState);
    // Return false to prevent the component from re-rendering
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("6. getSnapshotBeforeUpdate()", prevProps, prevState);
    // Return a value (snapshot) or null
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("7. componentDidUpdate()", prevProps, prevState, snapshot);
  }

  componentWillUnmount() {
    console.log("8. componentWillUnmount()");
  }

  handleIncrement = () => {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };

  render() {
    console.log("3. ** render()");
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

export default ClassLifecycle;

// https://chat.openai.com/c/015aba28-4812-4260-8079-9b30796f470c
