// forbedringer:
// - flytt start og slutt noder slik at de ikke står inne i veggene

export function createRecursiveMaze(grid, startNode, finishNode) {
  function addOuterWalls() {
    for (var i = 0; i < grid.length; i++) {
      if (i == 0 || i == grid.length - 1) {
        for (var j = 0; j < grid[0].length; j++) {
          grid[i][j].isWall = true
        }
      } else {
        grid[i][0].isWall = true
        grid[i][grid[0].length - 1].isWall = true
      }
    }
  }

  function addInnerWalls(h, minX, maxX, minY, maxY) {
    if (h) {
      if (maxX - minX < 2) {
        return
      }

      var y = Math.floor(randomNumber(minY, maxY) / 2) * 2
      addHWall(minX, maxX, y)

      addInnerWalls(!h, minX, maxX, minY, y - 1)
      addInnerWalls(!h, minX, maxX, y + 1, maxY)
    } else {
      if (maxY - minY < 2) {
        return
      }

      var x = Math.floor(randomNumber(minX, maxX) / 2) * 2
      addVWall(minY, maxY, x)

      addInnerWalls(!h, minX, x - 1, minY, maxY)
      addInnerWalls(!h, x + 1, maxX, minY, maxY)
    }
  }

  function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1

    for (var i = minX; i <= maxX; i++) {
      if (i == hole || grid[y][i].isStart || grid[y][i].isFinish)
        grid[y][i].isWall = false
      else grid[y][i].isWall = true
    }
  }

  function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1

    for (var i = minY; i <= maxY; i++) {
      if (i == hole || grid[i][x].isStart || grid[i][x].isFinish)
        grid[i][x].isWall = false
      else grid[i][x].isWall = true
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  addInnerWalls(true, 1, grid[0].length - 2, 1, grid.length - 2)
  addOuterWalls()
}
