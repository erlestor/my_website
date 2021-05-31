import React from "react"

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from "@material-ui/core"

const Menu = props => {
  const {
    algorithm,
    setAlgorithm,
    maze,
    setMaze,
    addWaypoint,
    resetBoard,
    generateMaze,
    visualizeAlgorithm,
  } = props

  const handleAlgorithmSelect = alg => {
    setAlgorithm(alg)
  }

  const handleMazeSelect = maze => {
    setMaze(maze)
  }

  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={6} align="right">
          <FormControl style={{ width: "200px", margin: "0 30px 20px 0" }}>
            <InputLabel>Pick an Algorithm</InputLabel>
            <Select
              value={algorithm}
              onChange={e => handleAlgorithmSelect(e.target.value)}
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"dijkstra"}>Dijkstra's algorithm</MenuItem>
              <MenuItem value={"aStar"}>A* algorithm</MenuItem>
              <MenuItem value={"greedyBestFirst"}>Greedy Best-First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} align="left">
          <FormControl style={{ width: "200px" }}>
            <InputLabel>Pick a Maze</InputLabel>
            <Select
              value={maze}
              onChange={e => handleMazeSelect(e.target.value)}
            >
              <MenuItem value={"recursive"}>Recursive division maze</MenuItem>
              <MenuItem value={"random"}>Basic random maze</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup variant="contained">
          <Button color="secondary" onClick={addWaypoint}>
            Add waypoint
          </Button>
          <Button color="primary" onClick={visualizeAlgorithm}>
            Visualize Algorithm
          </Button>
          <Button color="secondary" onClick={resetBoard}>
            Reset Board
          </Button>
          <Button color="secondary" onClick={generateMaze}>
            Generate Maze
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  )
}

export default Menu
