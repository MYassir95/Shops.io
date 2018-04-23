import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ShopsContainer } from './containers';
import { Home, Welcome, About, Contact, Listing } from './components';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Route>
    <Route path="/shops" component={Listing}>
      <IndexRoute component={ShopsContainer} />
    </Route>
  </Router>
);

export default routes;
