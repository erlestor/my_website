import React, { useState } from "react"
import "./styles.css"

import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

const Minesweeper = () => {
  const theme = useTheme()

  const NUMBER_OF_MINES = 10
  const BOARD_SIZE = 10

  const [subtext, setSubtext] = useState("Mines left: " + NUMBER_OF_MINES)
  const [board, setBoard] = useState(createBoard(BOARD_SIZE, NUMBER_OF_MINES))
  const [gameOver, setGameOver] = useState(false)

  // gjemt talls om jeg endrer for å oppdatere board, helt ræva løsning, men gidder ikke redux
  const [bullshit, setBullshit] = useState(0)

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

  function revealTile(tile) {
    if (tile.status !== "hidden") {
      return
    }

    if (tile.mine) {
      tile.status = "mine"
      setBullshit(bullshit + 1)
      return
    }

    tile.status = "number"

    const adjacentTiles = nearbyTiles(tile)
    const mines = adjacentTiles.filter(tile => tile.mine)

    if (mines.length === 0) {
      adjacentTiles.forEach(t => revealTile(t))
    } else {
      tile.text = mines.length
    }

    // tester å tving rerender
    setBullshit(bullshit + 1)
  }

  function markTile(tile) {
    if (tile.status !== "hidden" && tile.status !== "marked") {
      return
    }

    if (tile.status === "marked") {
      tile.status = "hidden"
      return
    }

    tile.status = "marked"
  }

  function listMinesLeft() {
    const markedTilesCount = board.filter(tile => tile.status === "marked")
      .length

    setSubtext(`Mines left:  ${NUMBER_OF_MINES - markedTilesCount}`)
    setBoard(board)
  }

  // hjelpefunksjoner
  function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }

  function randomNumber(size) {
    return Math.floor(Math.random() * size)
  }

  function nearbyTiles({ x, y }) {
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

    setBullshit(bullshit + 1)
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
  return (
    <div id="minesweeper">
      <div className="body">
        <Typography variant="h3" className="title">
          Minesweeper
        </Typography>
        <Typography variant="h5" className="subtext">
          {subtext}
        </Typography>
        <div className="board" style={{ backgroundColor: "#777" }}>
          {board.map(tile => (
            <div
              className={tile.status}
              onClick={() => {
                if (!gameOver) {
                  revealTile(tile)
                  checkGameEnd()
                }
              }}
              onContextMenu={e => {
                e.preventDefault()
                if (!gameOver) {
                  markTile(tile)
                  listMinesLeft()
                }
              }}
            >
              {tile.text}
            </div>
          ))}
        </div>
        <div style={{ display: "none" }}>{bullshit}</div>
      </div>
    </div>
  )
}

export default Minesweeper

// fikse revealing av tiles

// sjekke om spillet er over
