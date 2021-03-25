import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
  icon: {
    margin: "5px",
    fontSize: "40px",
    color: "gray",
    "&:hover": {
      color: "white",
    },
    transition: "250ms",
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      style={{
        width: "100vw",
        backgroundColor: "#1f2041",
        marginTop: "40px",
        padding: "50px",
        color: "lightgray",
      }}
    >
      <Grid item xs={12} md={6} align="center">
        <Typography variant="h5">Fancy footer</Typography>
        <Typography>
          Her er masse ubrukelig tekst. Vanligvis skriver man info om lokasjon
          osv, men jeg vil helst ikke ha besøk.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} align="center">
        <Typography variant="h5">Sosiale media</Typography>
        <Box>
          <InstagramIcon className={classes.icon} />
          <FacebookIcon className={classes.icon} />
          <GitHubIcon className={classes.icon} />
        </Box>
      </Grid>
    </Grid>
  );
}
