import run from "aocrunner"

const parseInput = (rawInput) => {
  const splitInput = rawInput.split("\n")
  let space = []
  for (let line of splitInput) {
    space.push(line.trim().split(""))
  }
  return space
}

const part1 = (rawInput) => {
  let universe = parseInput(rawInput)

  const galaxyData = {}

  function expandGalaxyMap(map) {
    let hasGalaxyInRow = new Array(map.length).fill(false)
    let hasGalaxyInColumn = new Array(map[0].length).fill(false)

    // Check for galaxies in each row and column
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "#") {
          hasGalaxyInRow[i] = true
          hasGalaxyInColumn[j] = true
        }
      }
    }

    // Expand rows if no galaxy present
    for (let i = 0; i < hasGalaxyInRow.length; i++) {
      if (!hasGalaxyInRow[i]) {
        map.splice(i, 0, new Array(map[i].length).fill("."))
        hasGalaxyInRow.splice(i, 0, false)
        i++ // Skip the newly added row
      }
    }

    // Expand columns if no galaxy present
    for (let j = 0; j < hasGalaxyInColumn.length; j++) {
      if (!hasGalaxyInColumn[j]) {
        for (let row of map) {
          row.splice(j, 0, ".")
        }
        hasGalaxyInColumn.splice(j, 0, false)
        j++ // Skip the newly added column
      }
    }

    return map
  }
  universe = expandGalaxyMap(universe)

  function findGalaxies(universe) {
    for (let row = 0; row < universe.length; row++) {
      for (let x = 0; x < universe[row].length; x++) {
        if (universe[row][x] === "#") {
          galaxyData[Object.keys(galaxyData).length + 1] = {
            xCoordinate: x,
            yCoordinate: row,
          }
        }
      }
    }
  }

  findGalaxies(universe)

  function generateGalaxyPairs(points) {
    const pairs = []
    const pointKeys = Object.keys(points)

    for (let i = 0; i < pointKeys.length; i++) {
      for (let j = i + 1; j < pointKeys.length; j++) {
        pairs.push([pointKeys[i], pointKeys[j]])
      }
    }

    return pairs
  }

  const galaxyPairs = generateGalaxyPairs(galaxyData)

  function calculateTotalShortestPathDistance(galaxyData, galaxyPairs) {
    function calculateDistance(p1, p2) {
      return (
        Math.abs(p1.xCoordinate - p2.xCoordinate) +
        Math.abs(p1.yCoordinate - p2.yCoordinate)
      )
    }

    let totalDistance = 0

    for (const pair of galaxyPairs) {
      const point1 = galaxyData[pair[0]]
      const point2 = galaxyData[pair[1]]
      totalDistance += calculateDistance(point1, point2)
    }

    return totalDistance
  }

  return calculateTotalShortestPathDistance(galaxyData, galaxyPairs)
}

const part2 = (rawInput) => {
  let universe = parseInput(rawInput)

  const galaxyData = {}

  function expandGalaxyMap(map) {
    let hasGalaxyInRow = new Array(map.length).fill(false)
    let hasGalaxyInColumn = new Array(map[0].length).fill(false)

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "#") {
          hasGalaxyInRow[i] = true
          hasGalaxyInColumn[j] = true
        }
      }
    }

    for (let i = 0; i < hasGalaxyInRow.length; i++) {
      if (!hasGalaxyInRow[i]) {
        map[i] = new Array(map[i].length).fill("x") // x means marked for expansion
      }
    }

    for (let j = 0; j < hasGalaxyInColumn.length; j++) {
      if (!hasGalaxyInColumn[j]) {
        for (let row of map) {
          row[j] = "x" // x means marked for expansion
        }
      }
    }

    return map
  }

  universe = expandGalaxyMap(universe)
  /*  
  console.log(universe)
  
  [
    [".", ".", "x", "#", ".", "x", ".", ".", "x", "."],
    [".", ".", "x", ".", ".", "x", ".", "#", "x", "."],
    ["#", ".", "x", ".", ".", "x", ".", ".", "x", "."],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    [".", ".", "x", ".", ".", "x", "#", ".", "x", "."],
    [".", "#", "x", ".", ".", "x", ".", ".", "x", "."],
    [".", ".", "x", ".", ".", "x", ".", ".", "x", "#"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    [".", ".", "x", ".", ".", "x", ".", "#", "x", "."],
    ["#", ".", "x", ".", "#", "x", ".", ".", "x", "."])
  ]
  yep, universe expansion logic works
  */

  function findGalaxies(universe) {
    for (let row = 0; row < universe.length; row++) {
      for (let x = 0; x < universe[row].length; x++) {
        if (universe[row][x] === "#") {
          galaxyData[Object.keys(galaxyData).length + 1] = {
            xCoordinate: x,
            yCoordinate: row,
          }
        }
      }
    }
  }

  findGalaxies(universe)

  function generateGalaxyPairs(points) {
    const pairs = []
    const pointKeys = Object.keys(points)

    for (let i = 0; i < pointKeys.length; i++) {
      for (let j = i + 1; j < pointKeys.length; j++) {
        pairs.push([pointKeys[i], pointKeys[j]])
      }
    }

    return pairs
  }

  const galaxyPairs = generateGalaxyPairs(galaxyData)

  function calculateDistance(p1, p2, map) {
    let distanceX = Math.abs(p1.xCoordinate - p2.xCoordinate)
    let distanceY = Math.abs(p1.yCoordinate - p2.yCoordinate)

    for (
      let i = Math.min(p1.xCoordinate, p2.xCoordinate);
      i < Math.max(p1.xCoordinate, p2.xCoordinate);
      i++
    ) {
      if (map[p1.yCoordinate][i] === "x") {
        distanceX += 999999
      }
    }

    for (
      let i = Math.min(p1.yCoordinate, p2.yCoordinate);
      i < Math.max(p1.yCoordinate, p2.yCoordinate);
      i++
    ) {
      if (map[i][p1.xCoordinate] === "x") {
        distanceY += 999999
      }
    }

    return distanceX + distanceY
  }

  function calculateTotalShortestPathDistance(galaxyData, galaxyPairs, map) {
    let totalDistance = 0

    for (const pair of galaxyPairs) {
      const point1 = galaxyData[pair[0]]
      const point2 = galaxyData[pair[1]]
      totalDistance += calculateDistance(point1, point2, map)
    }

    return totalDistance
  }

  return calculateTotalShortestPathDistance(galaxyData, galaxyPairs, universe)
}

run({
  part1: {
    tests: [
      {
        input: `...#......
                .......#..
                #.........
                ..........
                ......#...
                .#........
                .........#
                ..........
                .......#..
                #...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
              .......#..
              #.........
              ..........
              ......#...
              .#........
              .........#
              ..........
              .......#..
              #...#.....`,
        expected: 82000210,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
