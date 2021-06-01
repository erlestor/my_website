export function depthFirst(grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  startNode.isVisited = true
  const currentPath = [startNode]

  // hvis pathen er helt rom så må det bety at vi er stengt inne
  // det skal alltid være mulig å backtracke til startNode
  while (currentPath.length !== 0) {
    // henter ut den siste noden i pathen og nodens naboer
    const deepestNode = currentPath[currentPath.length - 1]
    const neighbors = getUnvisitedNeighbors(deepestNode, grid)

    // hvis det er ingen vei videre så backtracker vi ett steg
    if (neighbors.length === 0) {
      currentPath.pop()
      continue
    }

    // hvis det er en vei videre finner vi den
    const nextNode = neighbors.shift()

    nextNode.isVisited = true
    visitedNodesInOrder.push(nextNode)
    currentPath.push(nextNode)

    // Hvis vi er på finishNode er vi ferdig
    if (nextNode === finishNode) break
  }

  // fikser der visuelle
  for (let i = 1; i < currentPath.length; i++) {
    currentPath[i].previousNode = currentPath[i - 1]
  }

  return visitedNodesInOrder
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall)
}
