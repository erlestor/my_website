import React, { useEffect, useState } from "react";
import { Button, Typography, Grid } from "@material-ui/core";

// rafce for ny arrow function component

const Bored = () => {
  const [currentJoke, setCurrentJoke] = useState("");

  const fetchNewJoke = () => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((joke) => {
        setCurrentJoke(joke.setup + " " + joke.punchline);
      });
  };

  return (
    <Grid container spacing={4} direction="column" align="center">
      <Grid item xs={12}>
        <Typography variant="h4">
          Are you bored? Press the button below
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            fetchNewJoke();
          }}
        >
          Press me!
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ maxWidth: "400px" }}>
          {currentJoke}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Bored;
