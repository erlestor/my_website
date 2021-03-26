import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import DropDown from "./DropDown";

const useStyles = makeStyles({
  navlink: {
    "& p": {
      fontSize: "15px",
      margin: "15px",
      color: "#b0aca5",
      "&:hover": {
        color: "white",
        cursor: "pointer",
      },
      transition: "150ms",
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
});

function Nav() {
  const classes = useStyles();

  return (
    <AppBar
      style={{
        position: "sticky",
      }}
    >
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
          name="PROSJEKTER"
          link="prosjekt"
          items={[
            { name: "FØRSTE NETTSTED", link: "forste-nettsted" },
            { name: "TODOLISTE", link: "todolist" },
            { name: "KALENDER", link: "kalender" },
            { name: "MUSIKK LOBBY", link: "musikk-lobby" },
          ]}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
