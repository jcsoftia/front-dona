import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from './Home/Home';
import Help from './Help/Help';
import Login from './User/Login';
import MainNavigation from './Shared/Components/Navbar/MainNavigation';
import Donation from './User/Donation';
import About from './About/About'

import { AuthContext } from './Shared/Context/auth_context';
import { useAuth } from './Shared/hooks/auth-hook';
import './App.css'

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/donation" exact>
              <Donation/>
            </Route>
            <Route path="/help" exact>
              <Help/>
            </Route>
            <Route path="/about" exact>
              <About/>
            </Route>
            <Redirect to="/donation" />
          </Switch>
    );
    
  }else{
    routes = (
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/help" exact>
              <Help/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Redirect to="/login" />
          </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
