import React, { useState } from "react"
import "./styles.css"

import { Typography, Slider, Button } from "@material-ui/core"

const Minesweeper = () => {
  const BOARD_SIZE = 10

  const [subtext, setSubtext] = useState("Pick the number of mines")
  const [board, setBoard] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const [numberOfMines, setNumberOfMines] = useState(10)
  const [showStartOptions, setShowStartOptions] = useState(true)

  function createBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSize, numberOfMines)

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const tile = {
          x,
          y,
          mine: minePositions.some(mine => positionMatch(mine, { x, y })),
          status: "hidden",
          text: "",
        }
        board.push(tile)
      }
    }

    return board
  }

  function getMinePositions(boardSize, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
      const position = {
        x: randomNumber(boardSize),
        y: randomNumber(boardSize),
      }

      if (!positions.some(p => positionMatch(p, position))) {
        positions.push(position)
      }
    }

    return positions
  }

  function revealTile(x, y) {
    const newBoard = board.slice()
    const tile = newBoard[y * BOARD_SIZE + x]

    if (tile.status !== "hidden") return

    if (tile.mine) {
      tile.status = "mine"
      return
    }
    tile.status = "number"

    const adjacentTiles = nearbyTiles(newBoard, tile)
    const mines = adjacentTiles.filter(tile => tile.mine)

    if (mines.length === 0) {
      adjacentTiles.forEach(t => revealTile(t.x, t.y))
    } else {
      tile.text = mines.length
    }

    setBoard(newBoard)
  }

  function nearbyTiles(board, { x, y }) {
    const tiles = []

    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        const rowIndex = y + yOffset
        const columnIndex = x + xOffset

        if (rowIndex < 0 || rowIndex > 9 || columnIndex < 0 || columnIndex > 9)
          continue

        const tile = board[rowIndex * 10 + columnIndex]
        tiles.push(tile)
      }
    }

    return tiles
  }

  function markTile(x, y) {
    const newBoard = board.slice()
    const tile = newBoard[y * 10 + x]

    if (tile.status !== "hidden" && tile.status !== "marked") return

    if (tile.status === "marked") {
      tile.status = "hidden"
      return
    }
    tile.status = "marked"

    setBoard(newBoard)
  }

  function listMinesLeft() {
    const markedTilesCount = board.filter(tile => tile.status === "marked")
      .length

    setSubtext(`Mines left:  ${numberOfMines - markedTilesCount}`)
    setBoard(board)
  }

  // hjelpefunksjoner
  function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }

  function randomNumber(size) {
    return Math.floor(Math.random() * size)
  }

  function checkGameEnd() {
    const win = checkWin()
    const lose = checkLose()

    if (win || lose) {
      setGameOver(true)
    }

    if (win) {
      setSubtext("You win")
    }
    if (lose) {
      setSubtext("You lose")
      board.forEach(tile => {
        if (tile.status === "marked") markTile(tile)
        if (tile.mine) revealTile(tile)
      })
    }
  }

  function checkWin() {
    return board.every(
      tile =>
        tile.status === "number" ||
        (tile.mine && (tile.status === "hidden" || tile.status === "marked"))
    )
  }

  function checkLose() {
    return board.some(tile => tile.status === "mine")
  }

  const handleStartButton = () => {
    setBoard(createBoard(BOARD_SIZE, numberOfMines))
    setSubtext("Mines left: " + numberOfMines)
    setShowStartOptions(false)
  }

  return (
    <div id="minesweeper">
      <div className="body">
        <Typography variant="h3" className="title">
          Minesweeper
        </Typography>
        <Typography variant="h5" className="subtext">
          {subtext}
        </Typography>
        {showStartOptions && (
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
            <Typography
              style={{ margin: "20px 0 20px 0", textAlign: "center" }}
            >
              Mines chosen:{" "}
              {typeof numberOfMines === "number" ? numberOfMines : 10}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartButton}
            >
              Start game
            </Button>
          </div>
        )}
        {gameOver && (
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
        )}
        {!showStartOptions && (
          <div className="board">
            {board.map(tile => (
              <div
                className={tile.status}
                onClick={() => {
                  if (!gameOver) {
                    revealTile(tile.x, tile.y)
                    checkGameEnd()
                  }
                }}
                onContextMenu={e => {
                  e.preventDefault()
                  if (!gameOver) {
                    markTile(tile.x, tile.y)
                    listMinesLeft()
                  }
                }}
              >
                {tile.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Minesweeper
