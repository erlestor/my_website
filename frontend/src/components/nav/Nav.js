import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  styled,
  useTheme,
} from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

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

  const [showDropdown, setShowDowndown] = React.useState(false);

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
        <div
          className={classes.dropdown}
          onMouseEnter={() => setShowDowndown(true)}
          onMouseLeave={() => setShowDowndown(false)}
          onClick={() => setShowDowndown(false)}
        >
          <NavLink
            to="/prosjekt"
            className={classes.navlink}
            activeClassName={classes.active}
          >
            <Typography className={classes.navlink}>PROSJEKTER</Typography>
          </NavLink>
          {showDropdown && (
            <div className={classes.dropdownContent}>
              <NavLink
                exact
                to="/prosjekt/kalender"
                className={classes.navlink}
                activeClassName={classes.active}
              >
                <Typography className={classes.navlink}>KALENDER</Typography>
              </NavLink>
              <NavLink
                exact
                to="/prosjekt/todolist"
                className={classes.navlink}
                activeClassName={classes.active}
              >
                <Typography className={classes.navlink}>TODOLISTE</Typography>
              </NavLink>
              <NavLink
                exact
                to="/prosjekt/forste-nettsted"
                className={classes.navlink}
                activeClassName={classes.active}
              >
                <Typography className={classes.navlink}>
                  IT1 NETTSTED
                </Typography>
              </NavLink>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
