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
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownContent: {
    display: "block",
    position: "absolute",
    minWidth: "160px",
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
      position="sticky"
      style={{
        marginBottom: "20px",
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
          name="prosjekt"
          items={{ name: "KALENDER", link: "/kalender" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
