import React from "react"
import { Typography, Slider, Button } from "@material-ui/core"

const Menu = props => {
  const {
    numberOfMines,
    setNumberOfMines,
    setBoard,
    setShowStartOptions,
    setSubtext,
    createBoard,
  } = props

  const handleStartButton = () => {
    setBoard(createBoard(10, numberOfMines))
    setSubtext("Mines left: " + numberOfMines)
    setShowStartOptions(false)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "50px",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <Slider
          marks
          value={typeof numberOfMines === "number" ? numberOfMines : 10}
          step={1}
          min={1}
          max={20}
          valueLabelDisplay="auto"
          onChange={(event, newValue) => {
            setNumberOfMines(newValue)
          }}
        />
        <Typography style={{ margin: "20px 0 20px 0", textAlign: "center" }}>
          Mines chosen: {typeof numberOfMines === "number" ? numberOfMines : 10}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleStartButton}>
          Start game
        </Button>
      </div>
    </>
  )
}

export default Menu
