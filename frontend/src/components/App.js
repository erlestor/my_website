// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG

import React from "react";
import { render } from "react-dom";
import { Paper, Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Calendar from "./Calendar";
import Todolist from "./todo/Todolist";
import FirstWebsite from "./FirstWebsite";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#1f2041",
      },
      secondary: {
        main: "#ffc857",
      },
    },
  });

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Paper
            square
            style={{
              width: "100vw",
              minHeight: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Nav />
            <Route exact path="/kalender" component={Calendar} />
            <Route exact path="/forste-nettsted" component={FirstWebsite} />
            <Route exact path="/todolist" component={Todolist} />
            <Route exact path="/" component={Home} />
          </Paper>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

// DO NOT TOUCH
const appDiv = document.getElementById("app");
render(<App />, appDiv);
