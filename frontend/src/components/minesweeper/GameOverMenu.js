import React from "react"
import { Button } from "@material-ui/core"

const GameOverMenu = props => {
  const { setBoard, setShowStartOptions, setGameOver, setSubtext } = props

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        setBoard([])
        setShowStartOptions(true)
        setGameOver(false)
        setSubtext("Pick the number of mines")
      }}
      style={{ marginBottom: "20px" }}
    >
      Restart
    </Button>
  )
}

export default GameOverMenu
