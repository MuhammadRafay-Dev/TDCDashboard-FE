import React, { Component, useState } from "react";
import {
  Redirect,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component }) => {
  const [isUserChecked, setIsUserChecked] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData", userData);
  const navigate = useHistory();

  useEffect(() => {
    const isAuthenticated = userData?.accesstoken;
    setIsUserChecked(true);
    if (!isAuthenticated) {
      navigate.push("/auth/sign-in");
    }
  }, [userData]);
};

export default ProtectedRoute;
