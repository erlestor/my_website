import React from "react"

export default function Board(props) {
  const {
    board,
    gameOver,
    revealTile,
    checkGameEnd,
    markTile,
    listMinesLeft,
  } = props

  return (
    <div className="board" onContextMenu={(e) => e.preventDefault()}>
      {board.map((tile) => (
        <div
          className={tile.status}
          onClick={() => {
            if (!gameOver) {
              revealTile(tile.x, tile.y)
              checkGameEnd()
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            if (!gameOver) {
              markTile(tile.x, tile.y)
              listMinesLeft()
            }
          }}
          style={{
            color: `${
              tile.text === 1
                ? "blue"
                : tile.text === 2
                ? "green"
                : tile.text === 3
                ? "red"
                : ""
            }`,
          }}
        >
          {tile.text}
        </div>
      ))}
    </div>
  )
}
