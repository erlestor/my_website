// forbedringer:
// - flytt start og slutt noder slik at de ikke står inne i veggene

export function createRecursiveMaze(oldGrid) {
  function addOuterWalls() {
    for (let i = 0; i < grid.length; i++) {
      if (i == 0 || i == grid.length - 1) {
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j].isWall = true
          addedWalls.unshift([i, j])
        }
      } else {
        grid[i][0].isWall = true
        addedWalls.unshift([i, 0])
        grid[i][grid[0].length - 1].isWall = true
        addedWalls.unshift([i, grid[0].length - 1])
      }
    }
  }

  function addInnerWalls(h, minX, maxX, minY, maxY) {
    if (h) {
      if (maxX - minX < 2) return

      const y = randomEven(minY, maxY)
      addHWall(minX, maxX, y)

      addInnerWalls(!h, minX, maxX, minY, y - 1)
      addInnerWalls(!h, minX, maxX, y + 1, maxY)
    } else {
      if (maxY - minY < 2) return

      const x = randomEven(minX, maxX)
      addVWall(minY, maxY, x)

      addInnerWalls(!h, minX, x - 1, minY, maxY)
      addInnerWalls(!h, x + 1, maxX, minY, maxY)
    }
  }

  function addHWall(minX, maxX, y) {
    let hole = randomOdd(minX, maxX)

    for (let i = minX; i <= maxX; i++) {
      const node = grid[y][i]
      if (i === hole || node.isStart || node.isFinish) node.isWall = false
      else {
        node.isWall = true
        addedWalls.push([y, i])
      }
    }
  }

  function addVWall(minY, maxY, x) {
    let hole = randomOdd(minY, maxY)
    for (let i = minY; i <= maxY; i++) {
      const node = grid[i][x]
      if (i === hole || node.isStart || node.isFinish) node.isWall = false
      else {
        node.isWall = true
        addedWalls.push([i, x])
      }
    }
  }

  const grid = JSON.parse(JSON.stringify(oldGrid))
  const addedWalls = [] // består av [row, col] lister
  addInnerWalls(true, 1, grid[0].length - 2, 1, grid.length - 2)
  addOuterWalls()
  return addedWalls
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomOdd(min, max) {
  const n = Math.floor(randomNumber(min, max) / 2) * 2 + 1
  if (n < min) n += 2
  if (n > max) n -= 2
  return n
}

function randomEven(min, max) {
  const n = Math.floor(randomNumber(min, max) / 2) * 2
  if (n < min) n += 2
  if (n > max) n -= 2
  return n
}

console.log(randomEven(1, 9))
