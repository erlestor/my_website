import React, { useState, useEffect } from "react"
import Node from "./components/node/Node"
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra"
import { aStar } from "./algorithms/aStar"
import { greedyBestFirst } from "./algorithms/greedyBestFirst"

import "./PathfindingVisualizer.css"

import { Grid } from "@material-ui/core"
import Menu from "./components/Menu"

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([])

  const [startNode, setStartNode] = useState({ row: 10, col: 4 })
  const [finishNode, setFinishNode] = useState({ row: 10, col: 8 })
  const [waypointNode, setWaypointNode] = useState({ row: 5, col: 7 })

  const [changeTile, setChangeTile] = useState("")
  const [algorithm, setAlgorithm] = useState("dijkstra")
  const [maze, setMaze] = useState("random")
  const [algorithmActive, setAlgorithmActive] = useState(false)

  useEffect(() => {
    const grid = getInitialGrid(25, getNumberOfCols())
    setGrid(grid)
  }, [])

  function handleMouseDown(row, col) {
    if (algorithmActive) return
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
    if (algorithmActive) return
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
          node.isWall = false
        })
      )
  }, [startNode])

  useEffect(() => {
    if (changeTile !== "")
      setGrid(
        getNewGridWithNodeMoved(finishNode, (grid, node) => {
          grid.forEach(row => row.forEach(node => (node.isFinish = false)))
          node.isFinish = true
          node.isWall = false
        })
      )
  }, [finishNode])

  useEffect(() => {
    if (changeTile !== "")
      setGrid(
        getNewGridWithNodeMoved(waypointNode, (grid, node) => {
          grid.forEach(row => row.forEach(node => (node.isWaypoint = false)))
          node.isWaypoint = true
          node.isWall = false
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

  function visualizeAlgorithm() {
    if (algorithmActive) return
    setAlgorithmActive(true)

    const startNodeASD = grid[startNode.row][startNode.col]
    const finishNodeASD = grid[finishNode.row][finishNode.col]

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col]
        node.isVisited = false
        node.distance = Infinity
        if (node.isStart) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start"
        } else if (node.isFinish) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish"
        } else if (node.isWall) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-wall"
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node"
        }
      }
    }

    let alg = () => {}
    if (algorithm === "dijkstra") alg = dijkstra
    if (algorithm === "aStar") alg = aStar
    if (algorithm === "greedyBestFirst") alg = greedyBestFirst

    if (grid.some(row => row.some(node => node.isWaypoint))) {
      const wayPointNodeASD = grid[waypointNode.row][waypointNode.col]
      const visitedNodesToWaypoint = alg(grid, startNodeASD, wayPointNodeASD)
      const visitedNodesToFinish = alg(grid, wayPointNodeASD, finishNodeASD)
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
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder)
    } else {
      const visitedNodesInOrder = alg(grid, startNodeASD, finishNodeASD)
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(
        finishNodeASD
      )
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder)
    }
  }

  function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    setTimeout(() => {
      setAlgorithmActive(false)
      console.log("it worked bby")
    }, (visitedNodesInOrder.length + 1) * 10 + nodesInShortestPathOrder.length * 50 + 50)
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
    setGrid(getInitialGrid(25, getNumberOfCols()))

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col]
        node.isVisited = false
        node.distance = Infinity
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

  const handleAlgorithmSelect = alg => {
    setAlgorithm(alg)
  }

  const handleMazeSelect = maze => {
    setMaze(maze)
  }

  function generateMaze() {
    const newGrid = grid.slice()
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = newGrid[row][col]
        if (!node.isStart && !node.isFinish && !node.isWaypoint) {
          var random_boolean = Math.random() < 0.3
          node.isWall = random_boolean
        }
      }
    }
    setGrid(newGrid)
  }

  return (
    <Grid container id="pathfinding" direction="column">
      <Menu
        algorithm={algorithm}
        maze={maze}
        handleAlgorithmSelect={handleAlgorithmSelect}
        handleMazeSelect={handleMazeSelect}
        addWaypoint={addWaypoint}
        resetBoard={resetBoard}
        generateMaze={generateMaze}
        visualizeAlgorithm={visualizeAlgorithm}
      />
      <table
        className="grid"
        onMouseUp={handleMouseUp}
        style={{ margin: "30px" }}
      >
        {grid.map((row, rowIdx) => {
          return (
            <tr key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, isWaypoint } = node
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
  )
}

export default PathfindingVisualizer
