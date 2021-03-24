// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG
import React from "react";
import { render } from "react-dom";
import { Paper, Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import Home from "./Home";
import Projects from "./Projects";
import Calendar from "./calendar/Calendar";
import Todolist from "./todo/Todolist";
import FirstWebsite from "./FirstWebsite";

// musikk lobby
import HomePage from "./music_lobby/HomePage";

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
            <Route exact path="/prosjekt/kalender" component={Calendar} />
            <Route
              exact
              path="/prosjekt/forste-nettsted"
              component={FirstWebsite}
            />
            <Route path="/prosjekt/musikk-lobby" component={HomePage} />
            <Route exact path="/prosjekt/todolist" component={Todolist} />
            <Route exact path="/prosjekt" component={Projects} />
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
