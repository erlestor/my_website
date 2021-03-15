// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG

import React from "react";
import { render } from "react-dom";
// importing components
import Nav from "./Nav";
import Home from "./Home";
import Calendar from "./Calendar";
import FirstWebsite from "./FirstWebsite";
// importing routing things
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ width: "100vw" }}>
        <Router>
          <Grid container>
            <Grid item xs={12}>
              <Nav />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/kalender" component={Calendar} />
                <Route path="/forste-nettsted" component={FirstWebsite} />
              </Switch>
            </Grid>
          </Grid>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}

// DO NOT TOUCH
const appDiv = document.getElementById("app");
render(<App />, appDiv);
