import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
  icon: {
    margin: "10px",
    fontSize: "40px",
    color: "gray",
    "&:hover": {
      color: "white",
    },
    transition: "150ms",
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      align="center"
      spacing={4}
      style={{
        backgroundColor: "#1f2041",
        padding: "50px",
        color: "lightgray",
        margin: "auto 0 0 0",
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography variant="h5">Fancy footer</Typography>
        <Typography>
          Her er masse ubrukelig tekst. Vanligvis skriver man info om lokasjon
          osv, men jeg vil helst ikke ha besøk.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">Sosiale media</Typography>
        <Box>
          <a href="https://www.instagram.com/erlend_storsve/" target="_blank">
            <InstagramIcon className={classes.icon} />
          </a>
          <a href="https://www.facebook.com/erlend.storsve/" target="_blank">
            <FacebookIcon className={classes.icon} />
          </a>
          <a href="https://github.com/erlestor/my_website" target="_blank">
            <GitHubIcon className={classes.icon} />
          </a>
        </Box>
      </Grid>
    </Grid>
  );
}
