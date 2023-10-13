import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import FunctionLifecycle from './FunctionLifecycle'
import ClassLifecycle from './ClassLifecycle'
import SyntheticEvents from './SyntheticEvents'

// import { store, ReduxCounter } from "./Redux";

import { ReduxToolkit } from './ReduxToolkit'
import { store } from './redux-toolkit/store'

const App = () => (
  <Provider store={store}>
    {/* <SyntheticEvents /> */}
    {/* <ReduxCounter /> */}
    <ReduxToolkit />
    {/* <ClassLifecycle />
    <FunctionLifecycle /> */}
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
