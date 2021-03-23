import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function DropDown({ classes, name, link, items }) {
  const [showDropdown, setShowDowndown] = React.useState(false);

  return (
    <div
      className={classes.dropdown}
      onMouseEnter={() => setShowDowndown(true)}
      onMouseLeave={() => setShowDowndown(false)}
      onClick={() => setShowDowndown(false)}
    >
      <NavLink
        to={"/" + link}
        className={classes.navlink}
        activeClassName={classes.active}
      >
        <Typography className={classes.navlink}>{name}</Typography>
      </NavLink>
      {showDropdown && (
        <div className={classes.dropdownContent}>
          {items.map((item) => (
            <NavLink
              exact
              to={"/prosjekt/" + item.link}
              className={classes.navlink}
              activeClassName={classes.active}
            >
              <Typography className={classes.navlink}>{item.name}</Typography>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
