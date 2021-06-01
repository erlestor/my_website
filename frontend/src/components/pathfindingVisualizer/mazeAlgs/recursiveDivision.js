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

  const w = grid[0].length - 2
  const h = grid.length - 2
  divide(grid, 1, 1, w, h, choose_orientation(w, h))
}

const divide = (grid, x, y, width, height, orientation) => {
  const lim = 2 // skal egt være 2
  if (width < lim || height < lim) return

  const horizontal = orientation == HORIZONTAL

  // decides where the wall will be drawn from
  let wx = x + (horizontal ? 0 : randOdd(0, width))
  let wy = y + (horizontal ? randOdd(0, height) : 0)

  // where will the hole exist?
  const px = wx + (horizontal ? randEven(0, width) : 0)
  const py = wy + (horizontal ? 0 : randEven(0, height))

  // what direction will the wall be drawn?
  const dx = horizontal ? 1 : 0
  const dy = horizontal ? 0 : 1

  // how long will the wall be?
  const length = horizontal ? width : height

  for (let i = 0; i < length; i++) {
    const isHole = horizontal ? wx == px : wy == py
    const node = grid[wy][wx]
    if (!isHole && !(node.isStart || node.isFinish || node.isWaypoint)) {
      grid[wy][wx].isWall = true
    }
    wx += dx
    wy += dy
  }

  //   definerer hver enkelt del og deler de opp rekursivt
  let w = horizontal ? width : wx - x
  let h = horizontal ? wy - y : height
  divide(grid, x, y, w, h, choose_orientation(w, h))

  const nx = horizontal ? x : wx + 1
  const ny = horizontal ? wy + 1 : y
  w = horizontal ? width : width - wx - 1
  h = horizontal ? height - wy - 1 : height
  divide(grid, nx, ny, w, h, choose_orientation(w, h))
}

const randOdd = (min, max) => {
  return randInt(min, (max - 1) / 2) * 2 - 1
}

const randEven = (min, max) => {
  return randInt(min, (max - 1) / 2) * 2
}

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const choose_orientation = (width, height) => {
  if (width < height) return HORIZONTAL
  if (width > height) return VERTICAL
  const random_boolean = Math.random() < 0.5
  return random_boolean ? HORIZONTAL : VERTICAL
}
