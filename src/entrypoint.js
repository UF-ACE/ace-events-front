import React from "react";
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Index from '../pages/index'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  App(),
  document.getElementById('root')
);