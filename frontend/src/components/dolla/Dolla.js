import React from "react";
import "./Dolla.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";

function Dolla() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SigninPage} />
    </>
  );
}

export default Dolla;
