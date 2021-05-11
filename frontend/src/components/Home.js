import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Home() {
  return (
    <Grid container justify="center" spacing={4}>
      <Grid item xs={12} align="center">
        <Typography variant="h2">Hjemmeside</Typography>
      </Grid>
      <Grid item xs={11} md={6}>
        <img
          src=".././static/images/I am bready to die.jpg"
          style={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
