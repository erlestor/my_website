import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Home() {
  return (
    <Grid container>
      <Grid container item xs={12} justify="center">
        <Typography variant="h2">Hjemmeside</Typography>
      </Grid>
    </Grid>
  );
}
