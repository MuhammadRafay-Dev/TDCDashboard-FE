import "assets/css/App.css";
import { jwtDecode } from "jwt-decode";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import RtlLayout from "layouts/rtl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { clearUser, setUser } from "store/reducer/auth.reducer";
import SignIn from "views/auth/signIn";
import PasswordReset from "views/forget_password/components/PasswordReset";


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
    // console.log("isAuth", isAuthenticated)

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/sign-in" />
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
      <ProtectedRoute path={`/forget-password/verify`} component={PasswordReset} />
      <Route path={`/sign-in`} component={SignIn} />
      <Route path={`/rtl`} component={RtlLayout} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
};

export default App;
