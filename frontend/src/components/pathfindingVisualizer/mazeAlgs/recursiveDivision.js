// forbedringer:
// - flytt start og slutt noder slik at de ikke står inne i veggene

export function createRecursiveMaze(grid) {
  const newGrid = JSON.parse(JSON.stringify(grid))
  const addedWallsInOrder = [] // består av [row, col] lister
  addInnerWalls(
    newGrid,
    addedWallsInOrder,
    true,
    1,
    newGrid[0].length - 2,
    1,
    newGrid.length - 2
  )
  addOuterWalls(newGrid, addedWallsInOrder)
  return addedWallsInOrder
}

function addOuterWalls(grid, addedWallsInOrder) {
  for (var i = 0; i < grid.length; i++) {
    if (i == 0 || i == grid.length - 1) {
      for (var j = 0; j < grid[0].length; j++) {
        grid[i][j].isWall = true
        addedWallsInOrder.unshift([i, j])
      }
    } else {
      grid[i][0].isWall = true
      addedWallsInOrder.unshift([i, 0])
      grid[i][grid[0].length - 1].isWall = true
      addedWallsInOrder.unshift([i, grid[0].length - 1])
    }
  }
}

function addInnerWalls(grid, addedWallsInOrder, h, minX, maxX, minY, maxY) {
  if (h) {
    if (maxX - minX < 2) {
      return
    }

    var y = Math.floor(randomNumber(minY, maxY) / 2) * 2
    addHWall(grid, addedWallsInOrder, minX, maxX, y)

    addInnerWalls(grid, addedWallsInOrder, !h, minX, maxX, minY, y - 1)
    addInnerWalls(grid, addedWallsInOrder, !h, minX, maxX, y + 1, maxY)
  } else {
    if (maxY - minY < 2) {
      return
    }

    var x = Math.floor(randomNumber(minX, maxX) / 2) * 2
    addVWall(grid, addedWallsInOrder, minY, maxY, x)

    addInnerWalls(grid, addedWallsInOrder, !h, minX, x - 1, minY, maxY)
    addInnerWalls(grid, addedWallsInOrder, !h, x + 1, maxX, minY, maxY)
  }
}

function addHWall(grid, addedWallsInOrder, minX, maxX, y) {
  var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1

  for (var i = minX; i <= maxX; i++) {
    if (i == hole || grid[y][i].isStart || grid[y][i].isFinish)
      grid[y][i].isWall = false
    else {
      grid[y][i].isWall = true
      addedWallsInOrder.push([y, i])
    }
  }
}

function addVWall(grid, addedWallsInOrder, minY, maxY, x) {
  var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1

  for (var i = minY; i <= maxY; i++) {
    if (i == hole || grid[i][x].isStart || grid[i][x].isFinish)
      grid[i][x].isWall = false
    else {
      grid[i][x].isWall = true
      addedWallsInOrder.push([i, x])
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
