import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function DropDown({ classes }) {
  const [showDropdown, setShowDowndown] = React.useState(false);

  return (
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
            <Typography className={classes.navlink}>IT1 NETTSTED</Typography>
          </NavLink>
        </div>
      )}
    </div>
  );
}
