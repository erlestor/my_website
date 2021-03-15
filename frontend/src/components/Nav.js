import React from "react";
import { Button, Grid, Typography, ButtonGroup } from "@material-ui/core";

import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Grid container item justify="center">
      <ButtonGroup>
        <Button>Hjem</Button>
        <Button>Kalender</Button>
        <Button>Prosjekter</Button>
      </ButtonGroup>
    </Grid>
  );
}
