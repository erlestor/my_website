const HORIZONTAL = 1
const VERTICAL = 2

export function createRecursiveMaze(grid) {
  const rows = grid.length
  const cols = grid[0].length

  // makes a wall along the outer edge
  for (let col = 0; col < cols; col++) {
    grid[0][col].isWall = true
    grid[rows - 1][col].isWall = true
  }
  for (let row = 0; row < rows; row++) {
    grid[row][0].isWall = true
    grid[row][cols - 1].isWall = true
  }

  divide(grid, 1, 1, grid[0].length - 2, grid.length - 2, HORIZONTAL)
}

const divide = (grid, x, y, width, height, orientation) => {
  if (width < 2 || height < 2) return

  const horizontal = orientation == HORIZONTAL

  // decides where the wall will be drawn from
  let wx = x + (horizontal ? 0 : rand(width - 2))
  let wy = y + (horizontal ? rand(height - 2) : 0)

  // where will the passage through the wall exist?
  const px = wx + (horizontal ? rand(width) : 0)
  const py = wy + (horizontal ? 0 : rand(height))

  // what direction will the wall be drawn?
  const dx = horizontal ? 1 : 0
  const dy = horizontal ? 0 : 1

  // how long will the wall be?
  const length = horizontal ? width : height

  for (let i = 0; i < length; i++) {
    console.log("FUUUUUUCKKKKK")
    if (wx != px && wy != py) grid[wy][wx].isWall = true
    wx += dx
    wy += dy
  }

  //   // definerer hver enkelt del og deler de opp rekursivt
  //   let nx = x
  //   let ny = y
  //   let w = horizontal ? width : wx - x
  //   let h = horizontal ? wy - y : height
  //   divide(grid, nx, ny, w, h, choose_orientation(w, h))

  //   nx = x
  //   ny = y
  //   w = horizontal ? width : wx - x
  //   h = horizontal ? wy - y : height
  //   divide(grid, nx, ny, w, h, choose_orientation(w, h))
}

const rand = max => {
  return Math.floor(Math.random() * max)
}

const choose_orientation = (width, height) => {
  if (width < height) return HORIZONTAL
  if (width > height) return VERTICAL
  const random_boolean = Math.random() < 0.5
  return random_boolean ? HORIZONTAL : VERTICAL
}
