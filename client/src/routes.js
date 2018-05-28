import React from 'react';
import { Router, Route, hashHistory, IndexRoute, withRouter } from 'react-router';
import { ShopsContainer, LoginPage, SignupPage, PreferredShopsContainer } from './containers';
import { Listing } from './components';
import Auth from './modules/Auth'

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Listing}>
      <IndexRoute component={withRouter(ShopsContainer)}/>
      <Route path="login" component={LoginPage}/>
      <Route path="signup" component={SignupPage}/>
      <Route path="logout" onEnter={(nextState) => {Auth.deauthenticateUser(); hashHistory.push('/login');}}/>
      <Route path="preferred" component={ShopsContainer}/>
    </Route>    
  </Router>
);

export default routes;
