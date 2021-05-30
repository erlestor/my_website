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
    onMouseDown,
    onMouseEnter,
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
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    />
  )
}

export default Node
