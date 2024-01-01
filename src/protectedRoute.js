import React from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  );
};

export default ProtectedRoute;
