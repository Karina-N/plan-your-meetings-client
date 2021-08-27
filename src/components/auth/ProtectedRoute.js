import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, user, ...rest }) {
  if (user) {
    return <Route {...rest} render={(routeProps) => <Component {...routeProps} {...rest} userData={user} />} />;
  } else {
    return <Redirect to={{ pathname: "/", state: { from: rest.location } }} />;
  }
}

export default ProtectedRoute;
