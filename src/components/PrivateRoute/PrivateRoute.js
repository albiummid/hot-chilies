import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const loggedInUser = useSelector(state => {
    return state.user.loggedInUser?.[0];
  });
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;