import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { NavLink } from "react-router-dom"
import DropDown from "./DropDown"
import BigDropDown from "./BigDropDown"

const useStyles = makeStyles({
  navlink: {
    "& p": {
      fontSize: "15px",
      margin: "15px",
      color: "#b0aca5",
      transition: "150ms",
    },
    "&:hover": {
      "& p": {
        color: "white",
        cursor: "pointer",
      },
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownContent: {
    display: "block",
    position: "absolute",
    minWidth: "170px",
    zIndex: "1",
    backgroundColor: "#1f2041",
  },
  active: {
    "& p": {
      color: "white",
    },
  },
})

function Nav() {
  const classes = useStyles()

  return (
    <AppBar style={{ position: "sticky" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <NavLink
          exact
          to="/"
          className={classes.navlink}
          activeClassName={classes.active}
        >
          <Typography>HJEM</Typography>
        </NavLink>
        <DropDown
          classes={classes}
          name="PROSJEKT"
          link="prosjekt"
          items={[
            { name: "KORTESTE VEI", link: "pathfinding" },
            { name: "SORTERING", link: "sorting" },
            { name: "MUSIKK LOBBY", link: "musikk-lobby" },
            { name: "MINESWEEPER", link: "minesweeper" },
            { name: "KALENDER", link: "kalender" },
            { name: "TODOLISTE", link: "todolist" },
            { name: "I'M BORED", link: "bored" },
            { name: "COUNTER", link: "counter" },
          ]}
        />
        <BigDropDown
          classes={classes}
          name="STØRRE PROSJEKTER"
          link="nettsteder"
          items={[
            {
              name: "FØRSTE NETTSTED",
              link: "https://klasserom.thisismyshow.tk/200/elev20023/it1/",
            },
            {
              name: "DOLLA",
              link: "http://localhost:8000/prosjekt/dolla",
            },
          ]}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Nav
