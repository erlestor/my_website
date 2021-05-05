import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function BigDropDown({ classes, name, link, items }) {
  const [showDropdown, setShowDowndown] = React.useState(false);

  return (
    <Box
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
        <Box className={classes.dropdownContent}>
          {items.map((item) => (
            <a href={item.link} className={classes.navlink} target="_blank">
              <Typography>{item.name}</Typography>
            </a>
          ))}
        </Box>
      )}
    </Box>
  );
}
