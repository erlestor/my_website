import React from "react";
import { Button, ButtonGroup, Grid, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container justify="center" style={{ marginBottom: "20px" }}>
      <ButtonGroup variant="text">
        <Link to="/">
          <Button>Hjem</Button>
        </Link>
        <Link to="/kalender">
          <Button>Kalender</Button>
        </Link>
        <Button onClick={handleClick}>Prosjekter</Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={"/forste-nettsted"}
          >
            Første nettsted
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={"/todo"}>
            Todo-liste
          </MenuItem>
          <MenuItem onClick={handleClose}>prosjekt 3</MenuItem>
        </Menu>
      </ButtonGroup>
    </Grid>
  );
}

export default Nav;
