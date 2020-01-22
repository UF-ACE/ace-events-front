import React from 'react';
import ReactDOM from 'react-dom'
import Nav from '../components/nav'

import loadable from '@loadable/component'
import '../styles/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useUser } from './user';

const Index = loadable(() => import('../pages/index'))
const New = loadable(() => import('../pages/edit'))
const Event = loadable(() => import('../pages/event'))
const SignIn = loadable(() => import('../pages/signIn'))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const App = () => {
  const [loggedIn] = useUser()

  return (
    <Router>
      <Nav loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/edit/:eid" component={New} />
        <Route path="/sign_in/:id" component={SignIn} />
        <Route path="/:eid" component={Event} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);