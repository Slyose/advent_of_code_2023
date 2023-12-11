import run from "aocrunner"

const parseInput = (rawInput) => {
  const splitInput = rawInput.split("\n")
  let linesArr = []
  for (let line of splitInput) {
    linesArr.push(line.trim().split(""))
  }
  return linesArr
}

const part1 = (rawInput) => {
  const grid = parseInput(rawInput)
  let currentPositionData = { x: null, y: null, steps: 0 }

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === "S") {
        currentPositionData.x = column
        currentPositionData.y = row
      }
    }
  }

  const findFirstDirection = (positionData, grid) => {
    let { x, y, direction } = positionData
    if (grid[y + 1][x] === "|") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y - 1][x] === "|") {
      positionData.direction = "north"
      return positionData
    }
    if (grid[y][x + 1] === "-") {
      positionData.direction = "east"
      return positionData
    }
    if (grid[y][x - 1] === "-") {
      positionData.direction = "west"
      return positionData
    }
    if (grid[y + 1][x] === "L") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y + 1][x] === "J") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y + 1][x] === "7") {
      positionData.direction = "east"
      return positionData
    }
    if (grid[y][x - 1] === "F") {
      positionData.direction = "west"
      return positionData
    }
  }

  findFirstDirection(currentPositionData, grid)

  const findNextSteps = (positionData, grid) => {
    let { x, y, steps, direction } = positionData

    let moves = {
      north: { x: 0, y: -1 },
      south: { x: 0, y: 1 },
      east: { x: 1, y: 0 },
      west: { x: -1, y: 0 },
    }

    while (true) {
      let move = moves[direction]
      let newX = x + move.x
      let newY = y + move.y

      let nextTile = grid[newY][newX]

      if (nextTile === "L") {
        direction = direction === "west" ? "north" : "east"
      } else if (nextTile === "J") {
        direction = direction === "east" ? "north" : "west"
      } else if (nextTile === "7") {
        direction = direction === "east" ? "south" : "west"
      } else if (nextTile === "F") {
        direction = direction === "west" ? "south" : "east"
      }

      x = newX
      y = newY
      steps++

      if (nextTile === "S") {
        return Math.ceil(steps / 2)
      }
    }
  }

  return findNextSteps(currentPositionData, grid)
}

const part2 = (rawInput) => {
  let grid = parseInput(rawInput)

  console.log({ newgrid: grid })
  let currentPositionData = { x: null, y: null, steps: 0 }
  let loopTilesCoords = []

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === "S") {
        currentPositionData.x = column
        currentPositionData.y = row
      }
    }
  }

  const findFirstDirection = (positionData, grid) => {
    let { x, y, direction } = positionData
    if (grid[y + 1][x] === "|") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y - 1][x] === "|") {
      positionData.direction = "north"
      return positionData
    }
    if (grid[y][x + 1] === "-") {
      positionData.direction = "east"
      return positionData
    }
    if (grid[y][x - 1] === "-") {
      positionData.direction = "west"
      return positionData
    }
    if (grid[y + 1][x] === "L") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y + 1][x] === "J") {
      positionData.direction = "south"
      return positionData
    }
    if (grid[y + 1][x] === "7") {
      positionData.direction = "east"
      return positionData
    }
    if (grid[y][x - 1] === "F") {
      positionData.direction = "west"
      return positionData
    }
  }

  findFirstDirection(currentPositionData, grid)

  let loopDone = false

  const trackLoopTiles = (positionData, grid) => {
    let { x, y, steps, direction } = positionData
    loopTilesCoords.push([x, y])

    let moves = {
      north: { x: 0, y: -1 },
      south: { x: 0, y: 1 },
      east: { x: 1, y: 0 },
      west: { x: -1, y: 0 },
    }

    while (!loopDone) {
      let move = moves[direction]
      let newX = x + move.x
      let newY = y + move.y

      loopTilesCoords.push([newX, newY])

      let nextTile = grid[newY][newX]

      if (nextTile === "L") {
        direction = direction === "west" ? "north" : "east"
      } else if (nextTile === "J") {
        direction = direction === "east" ? "north" : "west"
      } else if (nextTile === "7") {
        direction = direction === "east" ? "south" : "west"
      } else if (nextTile === "F") {
        direction = direction === "west" ? "south" : "east"
      }

      x = newX
      y = newY

      if (nextTile === "S") {
        loopDone = true
      }
    }
  }

  trackLoopTiles(currentPositionData, grid)

  // floodfill needs to check if it's at a squeezepoint, either horizonal or vertical
  // and if it is, transmit through the squeezepoint

  const floodFill = (x, y, direction = null) => {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) return // Check bounds
    if (grid[y][x] === "loop" || grid[y][x] === "filled") return // Check if tile is part of the loop or already filled

    // this section is designed to get the flood fill to perpetuate though gaps.
    // ...
    // it doesn't work

    if (grid[y][x] === "verticalSqueeze") {
      if (direction === "up") {
        floodFill(x, y - 1, "up")
        return
      }
      if (direction === "down") {
        floodFill(x, y + 1, "down")
        return
      }
    } else if (grid[y][x] === "horizontalSqueeze") {
      if (direction === "right") {
        floodFill(x + 1, y, "right")
        return
      }
      if (direction === "left") {
        floodFill(x - 1, y, "left")
        return
      }
    } else {
      grid[y][x] = "filled"
      floodFill(x + 1, y, "right") // right
      floodFill(x - 1, y, "left") // left
      floodFill(x, y + 1, "down") // down
      floodFill(x, y - 1, "up") // up
      // can also flood diagonally
      floodFill(x + 1, y + 1) // bottom right
      floodFill(x + 1, y - 1) // top right
      floodFill(x - 1, y + 1) // top left
      floodFill(x - 1, y - 1) // bot left
    }
  }

  const leftWallRegex = /[|J7]/
  const rightWallRegex = /[|LF]/

  const topWallRegex = /[J\-L]/
  const bottomWallRegex = /[F\-7]/

  // console.log({ gridBeforeAll: grid })

  // Mark loop tiles on grid
  // console.log({ gridBeforeForEach: grid })
  loopTilesCoords.forEach(([x, y]) => {
    console.log(`I am looking for ${grid[y][x]}`)
    if (leftWallRegex.test(grid[y][x]) && rightWallRegex.test(grid[y][x + 1])) {
      grid[y][x] = "verticalSqueeze"
      grid[y][x + 1] = "verticalSqueeze"
    } else if (topWallRegex.test(grid[y][x])) {
      if (grid[y + 1]) {
        if (bottomWallRegex.test(grid[y + 1][x])) {
          grid[y][x] = "horizontalSqueeze"
        }
      }
    } else if (
      grid[y][x] !== "verticalSqueeze" &&
      grid[y][x] !== "horizontalSqueeze"
    ) {
      grid[y][x] = "loop"
    }
  })
  console.log({ markedLoopGrid: grid })
  // console.log({ gridBeforeFill: grid })
  // Run flood fill from the edges of the grid
  for (let y = 0; y < grid.length; y++) {
    floodFill(0, y) // Left edge
    floodFill(grid[0].length - 1, y) // Right edge
  }

  for (let x = 0; x < grid[0].length; x++) {
    floodFill(x, 0) // Top edge
    floodFill(x, grid.length - 1) // Bottom edge
  }
  // console.log({ floodedGrid: grid })

  // Count enclosed tiles
  let enclosedTiles = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (
        grid[y][x] !== "loop" &&
        grid[y][x] !== "filled" &&
        grid[y][x] !== "verticalSqueeze" &&
        grid[y][x] !== "horizontalSqueeze"
      ) {
        enclosedTiles++
      }
    }
  }
  // console.log({ FinalGridtasy: grid })

  return enclosedTiles
}

run({
  // part1: {
  //   tests: [
  //     {
  //       input: `.....
  //       .S-7.
  //       .|.|.
  //       .L-J.
  //       .....`,
  //       expected: 4,
  //     },
  //     {
  //       input: `..F7.
  //       .FJ|.
  //       SJ.L7
  //       |F--J
  //       LJ...`,
  //       expected: 8,
  //     },
  //   ],
  //   solution: part1,
  // },
  part2: {
    tests: [
      {
        input: `.....
                .S-7.
                .|.|.
                .L-J.
                .....`,
        expected: 1,
      },
      {
        input: `...........
                .S-------7.
                .|F-----7|.
                .||.....||.
                .||.....||.
                .|L-7.F-J|.
                .|..|.|..|.
                .L--J.L--J.
                ...........`,
        expected: 4,
      },
      {
        input: `..........
                .S------7.
                .|F----7|.
                .||OOOO||.
                .||OOOO||.
                .|L-7F-J|.
                .|II||II|.
                .L--JL--J.
                ..........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
                .|F--7||||||||FJ....
                .||.FJ||||||||L7....
                FJL7L7LJLJ||LJ.L-7..
                L--J.L7...LJS7F-7L7.
                ....F-J..F7FJ|L7L7L7
                ....L7.F7||L7|.L7L7|
                .....|FJLJ|FJ|F7|.LJ
                ....FJL-7.||.||||...
                ....L---J.LJ.LJLJ...`,
        expected: 8,
      },
      {
        input: `FF7FSF7F7F7F7F7F---7
                L|LJ||||||||||||F--J
                FL-7LJLJ||||||LJL-77
                F--JF--7||LJLJ7F7FJ-
                L---JF-JLJ.||-FJLJJ7
                |F|F-JF---7F7-L7L|7|
                |FFJF7L7F-JF7|JL---7
                7-L-JL7||F7|L7F-7F7|
                L.L7LFJ|||||FJL7||LJ
                L7JLJL-JLJLJL--JLJ.L`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
