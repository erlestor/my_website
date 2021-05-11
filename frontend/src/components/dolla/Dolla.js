import React from "react";
import { Box } from "@material-ui/core";
import "./Dolla.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";

function Dolla() {
  return (
    <div id="dolla">
      <Route exact path="/prosjekt/dolla/signin" component={SigninPage} />
      <Route exact path="/prosjekt/dolla" component={Home} />
    </div>
  );
}

export default Dolla;
