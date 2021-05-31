export function createRandomMaze(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const node = grid[row][col]
      if (!node.isStart && !node.isFinish && !node.isWaypoint) {
        const random_boolean = Math.random() < 0.3
        node.isWall = random_boolean
      }
    }
  }
}
