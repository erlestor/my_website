import React, { useState } from "react";
import { Button, Typography, Grid } from "@material-ui/core";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Grid container spacing={4} align="center">
      <Grid item xs={12}>
        <Typography variant="h3">The count is: {count}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </Button>
      </Grid>
    </Grid>
  );
};

export default Counter;
