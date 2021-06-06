import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { createContext, useEffect } from 'react';
import Home from './components/Home/Home';
import NotMatched from './components/NotMatched/NotMatched';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import FoodDetails from './components/FoodDetails/FoodDetails';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from './redux/actions/userActions';
export const UserContext = createContext();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    dispatch(setLoggedInUser(user));
  })
  return (

    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <Route path="/food-details/:id">
            <FoodDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotMatched />
          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
