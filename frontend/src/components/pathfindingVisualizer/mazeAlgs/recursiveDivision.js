// forbedringer:
// - flytt start og slutt noder slik at de ikke står inne i veggene

export function createRecursiveMaze(grid) {
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

  function addEntrance() {
    var x = randomNumber(1, grid.length - 1)
    grid[grid.length - 1][x].isWall = false
    return x
  }

  function addInnerWalls(h, minX, maxX, minY, maxY, gate) {
    if (h) {
      if (maxX - minX < 2) {
        return
      }

      var y = Math.floor(randomNumber(minY, maxY) / 2) * 2
      addHWall(minX, maxX, y)

      addInnerWalls(!h, minX, maxX, minY, y - 1, gate)
      addInnerWalls(!h, minX, maxX, y + 1, maxY, gate)
    } else {
      if (maxY - minY < 2) {
        return
      }

      var x = Math.floor(randomNumber(minX, maxX) / 2) * 2
      addVWall(minY, maxY, x)

      addInnerWalls(!h, minX, x - 1, minY, maxY, gate)
      addInnerWalls(!h, x + 1, maxX, minY, maxY, gate)
    }
  }

  function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1

    for (var i = minX; i <= maxX; i++) {
      if (i == hole) grid[y][i].isWall = false
      else grid[y][i].isWall = true
    }
  }

  function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1

    for (var i = minY; i <= maxY; i++) {
      if (i == hole) grid[i][x].isWall = false
      else grid[i][x].isWall = true
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  addOuterWalls()
  var ent = addEntrance()
  addInnerWalls(true, 1, grid[0].length - 2, 1, grid.length - 2, ent)
}
