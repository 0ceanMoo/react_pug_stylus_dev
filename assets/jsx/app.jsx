import css from '../css/app.styl'

import React from "react"
import {render} from "react-dom"

class TextInput extends React.Component {
  render() {
    return(
      <div>
        JSX：<input type="text" defaultValue="入力欄" />
      </div>
    )
  }
}

render(
  <TextInput/>,
  document.getElementById('app')
);
