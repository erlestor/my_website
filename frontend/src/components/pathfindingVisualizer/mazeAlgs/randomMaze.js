export function createRandomMaze(grid) {
  const addedWallsInOrder = []
  const newGrid = JSON.parse(JSON.stringify(grid))
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      const node = newGrid[row][col]
      if (!node.isStart && !node.isFinish && !node.isWaypoint) {
        const random_boolean = Math.random() < 0.3
        node.isWall = random_boolean
        if (random_boolean === true) addedWallsInOrder.push([row, col])
      }
    }
  }
  return addedWallsInOrder
}
