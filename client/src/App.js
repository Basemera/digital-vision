import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Shows from './containers/Shows';
import LoginForm from './containers/loginForm'
import MyShows from './containers/myShows';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/shows">
          <MyShows></MyShows>
        </Route>
        <Route path="/login">
          <LoginForm></LoginForm>
        </Route>
        <Route path="/">
          <Shows></Shows>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;