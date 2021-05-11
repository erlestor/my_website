import React, { useEffect, useState } from "react"
import "./styles.css"
import { Typography } from "@material-ui/core"

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

const Minesweeper = () => {
  const BOARD_SIZE = 10
  const NUMBER_OF_MINES = 8
  const [board, setBoard] = useState(createBoard(BOARD_SIZE, NUMBER_OF_MINES))
  const [minesLeftText, setMinesLeftText] = useState(
    "Mines left: " + NUMBER_OF_MINES
  )

  function createBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSize, numberOfMines)

    for (let x = 0; x < boardSize; x++) {
      const row = []

      for (let y = 0; y < boardSize; y++) {
        const tile = {
          x,
          y,
          mine: minePositions.some(positionMatch.bind(null, { x, y })),
          status: TILE_STATUSES.HIDDEN,
          text: "",
        }

        row.push(tile)
      }
      board.push(row)
    }

    return board
  }

  function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
      return (
        count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
      )
    }, 0)
    setMinesLeftText(`Mines left: ${NUMBER_OF_MINES - markedTilesCount}`)
  }

  function updateStatus(tile, status) {
    // oppdater kun den indeksen i board
    const newBoard = [...board]
    const newTile = { ...tile, [todo.status]: status }
    newBoard[tile.x][tile.y] = newTile
    setBoard(newBoard)
  }

  function markTile(tile) {
    if (
      tile.status !== TILE_STATUSES.HIDDEN &&
      tile.status !== TILE_STATUSES.MARKED
    )
      return

    if (tile.status === TILE_STATUSES.MARKED) {
      tile.status = TILE_STATUSES.HIDDEN
      return
    }

    tile.status = TILE_STATUSES.MARKED
  }

  function revealTile(tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
      return
    }

    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE
      return
    }

    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(tile)
    const mines = adjacentTiles.filter(tile => tile.mine)
    if (mines.length === 0) {
      adjacentTiles.forEach(t => revealTile(t))
    } else {
      tile.text = mines.length
    }
  }

  function checkGameEnd() {
    const win = checkWin()
    const lose = checkLose()

    if (win || lose) {
      // må skrives om. Handler om å stoppe klikking når spillet er over
      //   boardElement.addEventListener("click", stopProp, { capture: true })
      //   boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }

    if (win) {
      setMinesLeftText("You win")
    }
    if (lose) {
      setMinesLeftText("You lose")
      board.forEach(row => {
        row.forEach(tile => {
          if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
          if (tile.mine) revealTile(board, tile)
        })
      })
    }
  }

  function stopProp(e) {
    e.stopImmediatePropagation()
  }

  function checkWin() {
    return board.every(row => {
      return row.every(tile => {
        return (
          tile.status === TILE_STATUSES.NUMBER ||
          (tile.mine &&
            (tile.status === TILE_STATUSES.HIDDEN ||
              tile.status === TILE_STATUSES.MARKED))
        )
      })
    })
  }

  function checkLose() {
    return board.some(row =>
      row.some(tile => tile.status === TILE_STATUSES.MINE)
    )
  }

  function getMinePositions(boardSize, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
      const position = {
        x: randomNumber(boardSize),
        y: randomNumber(boardSize),
      }

      if (!positions.some(positionMatch.bind(null, position))) {
        positions.push(position)
      }
    }

    return positions
  }

  function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }

  function randomNumber(size) {
    return Math.floor(Math.random() * size)
  }

  function nearbyTiles(board, { x, y }) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = board[x + xOffset]?.[y + yOffset]
        if (tile) tiles.push(tile)
      }
    }

    return tiles
  }

  return (
    <div id="minesweeper">
      <div className="body">
        <Typography variant="h3" className="title">
          Minesweeper
        </Typography>
        <div className="subtext">{minesLeftText}</div>
        <div className="board">
          {board.map(row =>
            row.map(tile => (
              <div
                onClick={() => {
                  revealTile(board, tile)
                  checkGameEnd()
                }}
                onContextMenu={e => {
                  e.preventDefault()
                  markTile(tile)
                  listMinesLeft()
                }}
                className={tile.status}
                key={tile}
              >
                {tile.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Minesweeper
