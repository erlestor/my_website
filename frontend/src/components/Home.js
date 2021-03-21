import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12} align="center">
        <Typography variant="h2">Hjemmeside</Typography>
      </Grid>
    </Grid>
  );
}
