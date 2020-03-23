import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
    </Switch>
  );
}

export default App;
