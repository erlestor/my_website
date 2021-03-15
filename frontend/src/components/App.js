// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG

import React from "react";
import { render } from "react-dom";
import { Paper } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Calendar from "./Calendar";
import Todolist from "./Todolist";
import FirstWebsite from "./FirstWebsite";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#2196f3",
      },
    },
  });

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Paper style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <Nav />
            <Route exact path="/kalender" component={Calendar} />
            <Route exact path="/forste-nettsted" component={FirstWebsite} />
            <Route exact path="/todo" component={Todolist} />
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
