import React, { useEffect } from "react";
import "assets/css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  // const navigate = useHistory();
  // const location = useLocation();
  // const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  // useEffect(() => {
  //   console.log("authenticated", isAuthenticated);
  //   if (!isAuthenticated) {
  //     navigate.push("/auth/sign-in");
  //   } else {
  //     if (location.pathname === "/auth/sign-in") {
  //       navigate.goBack();
  //       window.location.reload();
  //     }
  //   }
  // }, [location, isAuthenticated]);

  return (
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Route path={`/rtl`} component={RtlLayout} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
};

export default App;
