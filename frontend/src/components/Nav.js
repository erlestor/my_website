import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, styled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navlink: {
    fontSize: "15px",
    margin: "10px",
    color: "#b0aca5",
    "&:hover": {
      color: "white",
      cursor: "pointer",
    },
  },
});

function Nav() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        marginBottom: "20px",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <Typography className={classes.navlink}>HJEM</Typography>
        </Link>
        <Typography className={classes.navlink} onClick={handleClick}>
          PROSJEKTER
        </Typography>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to={"/kalender"}>
            KALENDER
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={"/forste-nettsted"}
          >
            IT1 NETTSTED
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={"/todolist"}>
            TODO-LISTE
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
