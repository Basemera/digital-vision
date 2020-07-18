import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import LoginForm from './containers/loginForm'
import MyShows from './containers/myShows';
import MainShowContainer from './containers/MainShowContainer';

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
          <MainShowContainer></MainShowContainer>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;