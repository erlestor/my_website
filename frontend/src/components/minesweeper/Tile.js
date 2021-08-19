import React from "react"

export default function Tile(props) {
  const {} = props

  return (
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
  )
}
