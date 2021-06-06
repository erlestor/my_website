import React from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Typography } from "@material-ui/core"

export default function Home() {
  return (
    <Grid container justify="center" spacing={4}>
      <Grid item xs={12} align="center">
        <Typography variant="h2">Hjemmeside</Typography>
      </Grid>
      <Grid item xs={11} md={6}>
        <Typography variant="h6">
          Denne siden er under konstruksjon. <br />
        </Typography>
        <Link to="prosjekt">
          <Button variant="contained" color="primary">
            Se PROSJEKTER istedert
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}
