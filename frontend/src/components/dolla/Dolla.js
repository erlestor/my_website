import React from "react";
import { Box } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";

function Dolla() {
  return (
    <>
      <Route exact path="/prosjekt/dolla/signin" component={SigninPage} />
      <Route exact path="/prosjekt/dolla" component={Home} />
    </>
  );
}

export default Dolla;
