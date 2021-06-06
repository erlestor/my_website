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
    title: "Counter",
    description: "Enkel state managment i react",
    link: "counter",
  },
  {
    title: "I'm Bored",
    description:
      "Brukte eksterne API's og hvordan håndtere asynkrone hendelser i react",
    link: "bored",
  },
  {
    title: "Todo-liste",
    description: "Lage og bruke Django's innebygde SQLite database",
    link: "todolist",
  },
  {
    title: "Kalender",
    description:
      "Håndtering av JSON. Bruke fullcalendar rammeverket. Implementere egen backend som er kompatibel med fullcalendar",
    link: "kalendar",
  },
  {
    title: "Minesweeper",
    description:
      "Lage større forms med Google's Material UI. Håndtere ruter og spilltilstand i react",
    link: "minesweeper",
  },
  {
    title: "Musikk Lobby",
    description:
      "Håndtere Sessions. Generere nye sider med unik kode. Håndtere flere brukerinterkasjoner samtidig. Bruke Spotify's API med håndtering av tokens",
    link: "musikk-lobby",
  },
  {
    title: "Sortering",
    description:
      "Mestre populære sorteringsalgoritmer. Utføre dynamiske css-endringer og optimere hastighet på disse",
    link: "sorting",
  },
  {
    title: "Korteste vei",
    description:
      "Implementere korteste vei algoritmer. Avansert bruker-interaksjon. CSS animasjoner",
    link: "pathfinding",
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
          <Link to={`prosjekt/${p.link}`} style={{ color: "black" }}>
            <ProjectInfo>
              <b>{p.title}</b>
              <br />
              {p.description}
            </ProjectInfo>
          </Link>
        ))}
      </Grid>
    </Grid>
  )
}
