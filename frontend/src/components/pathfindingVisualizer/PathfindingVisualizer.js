import React, { useState, useEffect } from "react"
import Node from "./node/Node"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"

import "./PathfindingVisualizer.css"

import { Grid, Button, ButtonGroup } from "@material-ui/core"

// TODO:
// 1. handle edge cases
//  a. ikke tillat noe mens algoritmen/animasjonen kjører
// 2. legg til flytting av start og end tile
// Må beregne default start og finish også isåfall. Evt ikke plasser de automatisk

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([])

  const [startNode, setStartNode] = useState({ row: 10, col: 4 })
  const [finishNode, setFinishNode] = useState({ row: 10, col: 8 })
  const [waypointNode, setWaypointNode] = useState({ row: 5, col: 7 })

  const [changeTile, setChangeTile] = useState("")

  useEffect(() => {
    const grid = getInitialGrid(25, getNumberOfCols())
    setGrid(grid)
  }, [])

  function handleMouseDown(row, col) {
    if (row === startNode.row && col === startNode.col) {
      setChangeTile("start")
    } else if (row === finishNode.row && col === finishNode.col) {
      setChangeTile("finish")
    } else if (row === waypointNode.row && col === waypointNode.col) {
      setChangeTile("waypoint")
    } else {
      const newGrid = getNewGridWithWallToggled(row, col)
      setGrid(newGrid)
      setChangeTile("wall")
    }
  }

  function handleMouseUp() {
    setChangeTile("")
  }

  function handleMouseEnter(row, col) {
    switch (changeTile) {
      case "start":
        setStartNode({ row, col })
        break
      case "finish":
        setFinishNode({ row, col })
        break
      case "waypoint":
        setWaypointNode({ row, col })
        break
      case "wall":
        const newGrid = getNewGridWithWallToggled(row, col)
        setGrid(newGrid)
        break
    }
  }

  useEffect(() => {
    if (changeTile !== "")
      setGrid(
        getNewGridWithNodeMoved(startNode, (grid, node) => {
          grid.forEach(row => row.forEach(node => (node.isStart = false)))
          node.isStart = true
        })
      )
  }, [startNode])

  useEffect(() => {
    if (changeTile !== "")
      setGrid(
        getNewGridWithNodeMoved(finishNode, (grid, node) => {
          grid.forEach(row => row.forEach(node => (node.isFinish = false)))
          node.isFinish = true
        })
      )
  }, [finishNode])

  useEffect(() => {
    if (changeTile !== "")
      setGrid(
        getNewGridWithNodeMoved(waypointNode, (grid, node) => {
          grid.forEach(row => row.forEach(node => (node.isWaypoint = false)))
          node.isWaypoint = true
        })
      )
  }, [waypointNode])

  const getNewGridWithWallToggled = (row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    if (!isNodeEmpty(node)) return newGrid
    const newNode = {
      ...node,
      isWall: !node.isWall,
    }
    newGrid[row][col] = newNode
    return newGrid
  }

  const getNewGridWithNodeMoved = (gridNode, moveNode) => {
    const newGrid = grid.slice()
    const node = newGrid[gridNode.row][gridNode.col]
    if (!isNodeEmpty(node)) return newGrid
    moveNode(newGrid, node)
    return newGrid
  }

  const isNodeEmpty = node => {
    return !(node.isStart || node.isFinish || node.isWaypoint)
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

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: startNode && row === startNode.row && col === startNode.col,
      isFinish: finishNode && row === finishNode.row && col === finishNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isWaypoint: false,
      previousNode: null,
    }
  }

  const getNumberOfCols = () => {
    return Math.floor(window.innerWidth / 25) - 10
  }

  function visualizeDijkstra() {
    const startNodeASD = grid[startNode.row][startNode.col]
    const finishNodeASD = grid[finishNode.row][finishNode.col]

    if (grid.some(row => row.some(node => node.isWaypoint))) {
      const wayPointNodeASD = grid[waypointNode.row][waypointNode.col]
      const visitedNodesToWaypoint = dijkstra(
        grid,
        startNodeASD,
        wayPointNodeASD
      )
      const visitedNodesToFinish = dijkstra(
        grid,
        wayPointNodeASD,
        finishNodeASD
      )
      const shortestPathToWaypoint = getNodesInShortestPathOrder(
        wayPointNodeASD
      )
      const shortestPathToFinish = getNodesInShortestPathOrder(finishNodeASD)
      const visitedNodesInOrder = visitedNodesToWaypoint.concat(
        visitedNodesToFinish
      )
      const nodesInShortestPathOrder = shortestPathToWaypoint.concat(
        shortestPathToFinish
      )
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    } else {
      const visitedNodesInOrder = dijkstra(grid, startNodeASD, finishNodeASD)
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(
        finishNodeASD
      )
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }
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

  function resetBoard() {
    setStartNode({ row: 10, col: 4 })
    setFinishNode({ row: 10, col: 8 })
    setGrid(getInitialGrid(20, getNumberOfCols()))

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col]
        if (node.isStart) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start"
        } else if (node.isFinish) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish"
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node"
        }
      }
    }
  }

  function addWaypoint() {
    const newGrid = grid.slice()
    newGrid[waypointNode.row][waypointNode.col].isWaypoint = true
    setGrid(newGrid)
  }

  return (
    <Grid container id="pathfinding" direction="column">
      <Grid item xs={12} align="center">
        <ButtonGroup variant="contained">
          <Button color="secondary" onClick={addWaypoint}>
            Add waypoint
          </Button>
          <Button color="primary" onClick={visualizeDijkstra}>
            Visualize Dijkstra's Algorithm
          </Button>
          <Button color="secondary" onClick={resetBoard}>
            Reset Board
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} align="center">
        <table
          className="grid"
          onMouseUp={handleMouseUp}
          style={{ margin: "30px" }}
        >
          {grid.map((row, rowIdx) => {
            return (
              <tr key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isWaypoint,
                  } = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWaypoint={isWaypoint}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      row={row}
                    />
                  )
                })}
              </tr>
            )
          })}
        </table>
      </Grid>
    </Grid>
  )
}

export default PathfindingVisualizer
