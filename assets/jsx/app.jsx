import css from '../css/app.styl'

import React from "react"
import {render} from "react-dom"

class App extends React.Component {
  render() {
    return(
      <p> Hello React!</p>
    )
  }
}

render(
  <App/>,
  document.getElementById('app')
);
