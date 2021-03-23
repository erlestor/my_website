import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Project() {
  return (
    <Grid container align="center" direction="column" spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h2">Prosjekter</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>En oversikt over prosjekter</Typography>
      </Grid>
    </Grid>
  );
}
