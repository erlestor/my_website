export function depthFirst(grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (!!unvisitedNodes.length) {
    // Sorterer nodene ut ifra avstand
    sortNodesByDistance(unvisitedNodes, finishNode)
    // Velger den nærmeste noden
    const closestNode = unvisitedNodes.shift()
    // Hvis det er en vegg går vi til neste node
    if (closestNode.isWall) continue
    // Hvis noden har avstand uendelig er vi fanget
    if (closestNode.distance === Infinity) return visitedNodesInOrder
    // Hvis ikke kan vi nå besøke den
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    // Hvis vi er på slutten så er vi ferdig
    if (closestNode === finishNode) return visitedNodesInOrder
    //
    updateUnvisitedNeighbors(closestNode, grid)
  }
}

function sortNodesByDistance(unvisitedNodes, finishNode) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA - nodeB)
}

function calculateDistanceToFinishNode(node, finishNode) {
  return (
    Math.abs(finishNode.row - node.row) + Math.abs(finishNode.col - node.col)
  )
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter(neighbor => !neighbor.isVisited)
}

function getAllNodes(grid) {
  const nodes = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}
