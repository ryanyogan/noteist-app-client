import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './components/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />

    { /* Catch * routes, not found, etc... */ }
    <Route component={NotFound} />
  </Switch>
);
