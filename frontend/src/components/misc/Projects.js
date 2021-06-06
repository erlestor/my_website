import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

const ProjectInfo = styled(Typography)({
  fontSize: "1.25rem",
  textAlign: "left",
  margin: "20px",
})

const prosjektBeskrivelser = [
  {
    title: "Counter",
    description: "Enkel state managment i react",
  },
  {
    title: "I'm Bored",
    description:
      "Brukte eksterne API's og hvordan håndtere asynkrone hendelser i react",
  },
  {
    title: "Todo-liste",
    description: "Lage og bruke Django's innebygde SQLite database",
  },
  {
    title: "Kalender",
    description:
      "Håndtering av JSON. Bruke fullcalendar rammeverket. Implementere egen backend som er kompatibel med fullcalendar",
  },
  {
    title: "Minesweeper",
    description:
      "Lage større forms med Google's Material UI. Håndtere ruter og spilltilstand i react",
  },
  {
    title: "Musikk Lobby",
    description:
      "Håndtere Sessions. Generere nye sider med unik kode. Håndtere flere brukerinterkasjoner samtidig. Bruke Spotify's API med håndtering av tokens",
  },
  {
    title: "Sortering",
    description:
      "Mestre populære sorteringsalgoritmer. Utføre dynamiske css-endringer og optimere hastighet på disse",
  },
  {
    title: "Korteste vei",
    description:
      "Implementere korteste vei algoritmer. Avansert bruker-interaksjon. CSS animasjoner",
  },
]

export default function Project() {
  return (
    <Grid container align="center" direction="column" spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h1">Prosjekter</Typography>
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
          <ProjectInfo>
            <b>{p.title}</b>
            <br />
            {p.description}
          </ProjectInfo>
        ))}
      </Grid>
    </Grid>
  )
}
