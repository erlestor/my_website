import React from "react"

import "./Node.css"

const Node = props => {
  const {
    row,
    col,
    isFinish,
    isStart,
    isWall,
    isWaypoint,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = props

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWaypoint
    ? "node-waypoint"
    : isWall
    ? "node-wall"
    : ""

  return (
    <td
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
    />
  )
}

export default Node
