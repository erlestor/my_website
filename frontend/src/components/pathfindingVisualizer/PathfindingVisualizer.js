import React, { useState, useEffect } from "react"
import Node from "./node/Node"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"

import "./PathfindingVisualizer.css"

import { Grid, Button } from "@material-ui/core"

// TODO:
// 1. handle edge cases
//  a. ikke tillat noe mens algoritmen/animasjonen kjører
// 2. legg til flytting av start og end tile
// Må beregne default start og finish også isåfall. Evt ikke plasser de automatisk

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([])

  const [startNode, setStartNode] = useState({ row: 10, col: 4 })
  const [finishNode, setFinishNode] = useState({ row: 10, col: 8 })

  const [moveStartNode, setMoveStartNode] = useState(false)
  const [moveFinishNode, setMoveFinishNode] = useState(false)

  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  useEffect(() => {
    const grid = getInitialGrid(20, getNumberOfCols())
    setGrid(grid)
  }, [])

  function handleMouseDown(row, col) {
    if (row === startNode.row && col === startNode.col) {
      setMoveStartNode(true)
    } else if (row === finishNode.row && col === finishNode.col) {
      setMoveFinishNode(true)
    } else {
      const newGrid = getNewGridWithWallToggled(row, col)
      setGrid(newGrid)
      setMouseIsPressed(true)
    }
  }

  function handleMouseEnter(row, col) {
    if (mouseIsPressed) {
      const newGrid = getNewGridWithWallToggled(row, col)
      setGrid(newGrid)
    }
    if (moveStartNode) {
      setStartNode({ row, col })
      setGrid(geNewGridWithStartMoved(row, col))
    }
    if (moveFinishNode) {
      setFinishNode({ row, col })
      setGrid(getNewGridWithFinishMoved(row, col))
    }
  }

  function handleMouseUp() {
    setMouseIsPressed(false)
    setMoveStartNode(false)
    setMoveFinishNode(false)
  }

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited"
      }, 10 * i)
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path"
      }, 50 * i)
    }
  }

  function visualizeDijkstra() {
    const startNodeASD = grid[startNode.row][startNode.col]
    const finishNodeASD = grid[finishNode.row][finishNode.col]
    const visitedNodesInOrder = dijkstra(grid, startNodeASD, finishNodeASD)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeASD)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: startNode && row === startNode.row && col === startNode.col,
      isFinish: finishNode && row === finishNode.row && col === finishNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  const getInitialGrid = (rows, cols) => {
    const grid = []
    for (let row = 0; row < rows; row++) {
      const currentRow = []
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(col, row))
      }
      grid.push(currentRow)
    }
    return grid
  }

  const getNewGridWithWallToggled = (row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
      ...node,
      isWall: !node.isWall,
    }
    newGrid[row][col] = newNode
    return newGrid
  }

  const geNewGridWithStartMoved = (row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    newGrid.forEach(row => row.forEach(node => (node.isStart = false)))
    node.isStart = true
    return newGrid
  }

  const getNewGridWithFinishMoved = (row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    newGrid.forEach(row => row.forEach(node => (node.isFinish = false)))
    node.isFinish = true
    return newGrid
  }

  const getNumberOfCols = () => {
    return Math.floor(window.innerWidth / 25) - 5
  }

  return (
    <Grid container id="pathfinding" direction="column">
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={visualizeDijkstra}>
          Visualize Dijkstra's Algorithm
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                      row={row}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </Grid>
    </Grid>
  )
}

export default PathfindingVisualizer
