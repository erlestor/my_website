import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function DropDown({ classes, name, link, items }) {
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
          {items.map((item) => {
            if (item.linkToOtherSite) {
              return (
                <a
                  href={item.linkToOtherSite}
                  className={classes.navlink}
                  target="_blank"
                >
                  <Typography>{item.name}</Typography>
                </a>
              );
            }
            return (
              <NavLink
                exact
                to={"/prosjekt/" + item.link}
                className={classes.navlink}
                activeClassName={classes.active}
              >
                <Typography>{item.name}</Typography>
              </NavLink>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
