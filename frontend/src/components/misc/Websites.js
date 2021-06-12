import React from "react"
import { Link } from "react-router-dom"
import { Grid, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

const ProjectInfo = styled(Typography)({
  fontSize: "1.25rem",
  textAlign: "left",
  margin: "20px",
})

const prosjektBeskrivelser = [
  {
    title: "Første nettsted",
    description:
      "Nettstedet jeg lagde mens jeg tok IT1 i VG2. Bygd med html, css og litt javascript på frontend. På backenden brukte jeg php sammen med noen sql databaser. Høydepunkt er Dykkeklubb sql oppgaven og gitarbutikken.",
    link: "https://klasserom.thisismyshow.tk/200/elev20023/it1/",
  },
  {
    title: "Dolla",
    description:
      "Dolla var et prosjekt jeg lagde for å lære meg bedre design. Bruker styled components i react slik at meste parten av kodingen gikk i css. Bruker også React Scroll for fine scrolle animasjoner",
    link: "http://localhost:8000/prosjekt/dolla",
  },
]

export default function Websites() {
  return (
    <Grid container align="center" direction="column" spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h1">Nettsteder</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={8}
        md={6}
        style={{ textAlign: "left", alignSelf: "center" }}
      >
        {prosjektBeskrivelser.map(p => (
          <a href={p.link} style={{ color: "black" }} target="_blank">
            <ProjectInfo>
              <b>{p.title}</b>
              <br />
              {p.description}
            </ProjectInfo>
          </a>
        ))}
      </Grid>
    </Grid>
  )
}
