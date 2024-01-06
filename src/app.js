import React, { useEffect } from "react";
import "assets/css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "store/reducer/auth.reducer";
import { clearUser } from "store/reducer/auth.reducer";
import { jwtDecode } from "jwt-decode";

const App = () => {
  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      return decoded.exp < currentTime;
    } catch (error) {
      return true; // Invalid token or other decoding error
    }
  }

  function ProtectedRoute({ component: Component, ...rest }) {
    const dispatch = useDispatch();
    const navigate = useHistory();

    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData.accesstoken && isTokenExpired(userData.accesstoken)) {
        localStorage.removeItem("userData");
        dispatch(clearUser());
      } else {
        dispatch(setUser(userData));
      }
    }
    let isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      />
    );
  }

  function ProtectedLogin({ component: Component, ...rest }) {
    const navigate = useHistory();
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

    useEffect(() => {
      if (isAuthenticated) {
        navigate.replace("/admin");
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
      return null;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return (
    <Switch>
      <ProtectedLogin path={`/auth`} component={AuthLayout} />
      <ProtectedRoute path={"/admin"} component={AdminLayout} />
      {/* <Route path={`/admin`} component={AdminLayout} /> */}
      <Route path={`/rtl`} component={RtlLayout} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
};

export default App;
