// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG
import React from "react";
import { render } from "react-dom";
import { Paper, Grid, Box } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./Footer";
import Home from "./Home";
import Projects from "./Projects";
import Calendar from "./calendar/Calendar";
import Todolist from "./todo/Todolist";
import FirstWebsite from "./FirstWebsite";

// musikk lobby
import HomePage from "./music_lobby/HomePage";
import Counter from "./Counter";

// dolla
import Dolla from "./dolla/Dolla";

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

const useStyles = makeStyles({
  wrapper: {
    width: "100vw",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    paddingTop: "40px",
    paddingBottom: "40px",
  },
});

export default function App(props) {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Paper square className={classes.wrapper}>
            <Nav />
            <Box className={classes.body}>
              <Route exact path="/prosjekt/kalender" component={Calendar} />
              <Route exact path="/prosjekt/dolla" component={Dolla} />
              <Route
                exact
                path="/prosjekt/forste-nettsted"
                aa
                component={FirstWebsite}
              />
              <Route path="/prosjekt/musikk-lobby" component={HomePage} />
              <Route exact path="/prosjekt/todolist" component={Todolist} />
              <Route exact path="/prosjekt/counter" component={Counter} />
              <Route exact path="/prosjekt" component={Projects} />
              <Route exact path="/" component={Home} />
            </Box>
            <Footer />
          </Paper>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

// DO NOT TOUCH
const appDiv = document.getElementById("app");
render(<App />, appDiv);
