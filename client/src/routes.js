import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ShopsContainer, LoginPage, SignupPage } from './containers';
import { Listing } from './components';
import { RequireAuth } from './wrappers/RequireAuth';
import Auth from './modules/Auth'

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Listing}>
      <IndexRoute component={RequireAuth(ShopsContainer)}/>
      <Route path="login" component={LoginPage}/>
      <Route path="signup" component={SignupPage}/>
    </Route>
  </Router>
);

export default routes;
