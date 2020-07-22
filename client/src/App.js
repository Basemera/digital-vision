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
import MyFavShows from './containers/myFavShows';
import MainShowContainer from './containers/MainShowContainer';
import IS_LOGGED_IN from './queries/isLoggedIn';
import { useQuery } from 'react-apollo'

// function IsLoggedIn() {
//   const { data } = useQuery(IS_LOGGED_IN);
//   return data.isLoggedIn ? <Pages /> : <Login />;
// }

function App() {

  const {data} = useQuery(IS_LOGGED_IN)

  return (
    <Router>
      <Switch>
        <Route path="/shows">
          {
            data.isLoggedIn ? <MyShows></MyShows> : <LoginForm></LoginForm>
          }   
        </Route>
        <Route path="/favourites">
          {
            data.isLoggedIn ? <MyFavShows></MyFavShows> : <LoginForm></LoginForm>
          }   
        </Route>
        <Route path="/login">
          {
            data.isLoggedIn ? <MainShowContainer></MainShowContainer> : <LoginForm></LoginForm>
          }
        </Route>
        <Route path="/">
          {
            data.isLoggedIn ? <MainShowContainer></MainShowContainer> : <LoginForm></LoginForm>
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;