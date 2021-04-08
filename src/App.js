import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import NotMatched from './components/NotMatched/NotMatched';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import FoodDetails from './components/FoodDetails/FoodDetails';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [cartItems, setCartItems] = useState([]);
  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser,cartItems,setCartItems]}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/food-details/:id">
            <FoodDetails/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
          <Home/>
          </Route>
         
          
          <Route path="*">
            <NotMatched/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
