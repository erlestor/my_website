// HELE IDEEN ER Å IKKE RØRE DENNE TROR JEG
import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Paper, Box } from "@material-ui/core"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

import styles from "./App.module.css"

import Nav from "./nav/Nav"
import Footer from "./misc/Footer"
import Home from "./misc/Home"
import Projects from "./misc/Projects"
import Websites from "./misc/Websites"
import Calendar from "./calendar/Calendar"
import Counter from "./misc/Counter"
import Todolist from "./todo/Todolist"
import Dolla from "./dolla/Dolla"
import Bored from "./bored/Bored"
import Minesweeper from "./minesweeper/Minesweeper"
import PathfindingVisualizer from "./pathfindingVisualizer/PathfindingVisualizer"
import SortingVisualizer from "./sortingVisualizer/SortingVisualizer"

// musikk lobby
import HomePage from "./music_lobby/HomePage"

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
  typography: {
    h6: {
      fontSize: "1.25rem",
    },
  },
})

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/prosjekt/dolla" component={Dolla} />
        <ThemeProvider theme={theme}>
          <Paper square className={styles.wrapper}>
            <Nav />
            <Box className={styles.body}>
              <Route path="/prosjekt/kalender" component={Calendar} />
              <Route path="/prosjekt/musikk-lobby" component={HomePage} />
              <Route path="/prosjekt/todolist" component={Todolist} />
              <Route path="/prosjekt/counter" component={Counter} />
              <Route path="/prosjekt/bored" component={Bored} />
              <Route path="/prosjekt/minesweeper" component={Minesweeper} />
              <Route
                path="/prosjekt/pathfinding"
                component={PathfindingVisualizer}
              />
              <Route path="/prosjekt/sorting" component={SortingVisualizer} />
              <Route exact path="/prosjekt" component={Projects} />
              <Route exact path="/nettsteder" component={Websites} />
              <Route exact path="/" component={Home} />
            </Box>
            <Footer />
          </Paper>
        </ThemeProvider>
      </Switch>
    </Router>
  )
}

// DO NOT TOUCH
const appDiv = document.getElementById("app")
render(<App />, appDiv)
