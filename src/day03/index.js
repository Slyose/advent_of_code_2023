import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const linesArr = input.split("\n")

  const symbolsRegex = /[^\d\.]/g

  let symbolsData = []
  let numsData = []
  let validPartNumbers = []

  // turn each line into an array
  // grab data on each symbol, x and y values
  // do a function on each line to get objects with number, y axis, starting x axis and ending x axis
  // function that goes through each number and checks the symbolsData for an adjacent symbol
  // if matching, push to an array of valid numbers , then sum those in a reduce

  for (let [index, line] of linesArr.entries()) {
    //Grab symbols & numbers data for the line
    let yCoord = index
    let newNumber = ""
    let newNumberStartingXCoord
    let newNumberEndingXCoord
    let newNumberYCoord
    let isThisANewNumber = true

    for (let x = 0; x < line.length; x++) {
      let char = line[x]
      let nextChar = line[x + 1]

      if (symbolsRegex.test(char)) {
        symbolsData.push({ symbol: char, xCoord: x, yCoord })
      } else if (Number(char) || char === "0") {
        newNumber += char
        if (isThisANewNumber) {
          newNumberStartingXCoord = x
          newNumberYCoord = index
          isThisANewNumber = false
        }
        if (!(Number(nextChar) || nextChar === "0")) {
          newNumberEndingXCoord = x
          numsData.push({
            number: newNumber,
            StartingXCoord: newNumberStartingXCoord,
            EndingXCoord: newNumberEndingXCoord,
            yCoord: newNumberYCoord,
          })
          newNumber = ""
          isThisANewNumber = true
        }
      }
    }
  }

  const symbolCoordsStr = symbolsData.reduce((coords, coord) => {
    coords.push(`${coord.xCoord}, ${coord.yCoord}`) // why a string? ez to check equality.
    return coords
  }, [])

  const isSymbolTouching = (num, symbolCoordsStr) => {
    const adjacentCoords = []
    adjacentCoords.push(
      // Horizontal coords - either side of the number
      [num.StartingXCoord - 1, num.yCoord],
      [num.EndingXCoord + 1, num.yCoord],
      // Diagonals at start of number
      [num.StartingXCoord - 1, num.yCoord - 1],
      [num.StartingXCoord - 1, num.yCoord + 1],
      // Diagonals at the end of the number
      [num.EndingXCoord + 1, num.yCoord - 1],
      [num.EndingXCoord + 1, num.yCoord + 1],
    )

    for (let x = num.StartingXCoord; x <= num.EndingXCoord; x++) {
      // adj coords directly above and below
      adjacentCoords.push([x, num.yCoord + 1])
      adjacentCoords.push([x, num.yCoord - 1])
    }

    const adjacentCoordStr = adjacentCoords.reduce((coords, coord) => {
      coords.push(`${coord[0]}, ${coord[1]}`) // why a string? ez to check equality.
      return coords
    }, [])

    for (const adjacentCoord of adjacentCoordStr) {
      if (symbolCoordsStr.includes(adjacentCoord)) {
        return true
      }
    }
    return false
  }

  for (let num of numsData) {
    if (isSymbolTouching(num, symbolCoordsStr)) {
      validPartNumbers.push(num.number)
    }
  }

  return validPartNumbers.reduce((total, validPartNumber) => {
    return total + Number(validPartNumber)
  }, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const linesArr = input.split("\n")

  const symbolsRegex = /[^\d\.]/g

  let symbolsData = []
  let numsData = []
  let validPartNumbers = []

  for (let [index, line] of linesArr.entries()) {
    // Grab symbols & numbers data for each line
    let yCoord = index
    let newNumber = ""
    let newNumberStartingXCoord
    let newNumberEndingXCoord
    let newNumberYCoord
    let isThisANewNumber = true

    for (let x = 0; x < line.length; x++) {
      let char = line[x]
      let nextChar = line[x + 1]

      if (symbolsRegex.test(char)) {
        symbolsData.push({ symbol: char, xCoord: x, yCoord })
      } else if (Number(char) || char === "0") {
        newNumber += char
        if (isThisANewNumber) {
          newNumberStartingXCoord = x
          newNumberYCoord = index
          isThisANewNumber = false
        }
        if (!(Number(nextChar) || nextChar === "0")) {
          newNumberEndingXCoord = x
          numsData.push({
            number: newNumber,
            StartingXCoord: newNumberStartingXCoord,
            EndingXCoord: newNumberEndingXCoord,
            yCoord: newNumberYCoord,
          })
          newNumber = ""
          isThisANewNumber = true
        }
      }
    }
  }

  const findAdjacentCoords = (num, symbolCoordsStr) => {
    const adjacentCoords = []
    adjacentCoords.push(
      //horizontal coords - either side of the number
      [num.StartingXCoord - 1, num.yCoord],
      [num.EndingXCoord + 1, num.yCoord],
      // diagonals at start of number
      [num.StartingXCoord - 1, num.yCoord - 1],
      [num.StartingXCoord - 1, num.yCoord + 1],
      // Diagonals at the end of the number
      [num.EndingXCoord + 1, num.yCoord - 1],
      [num.EndingXCoord + 1, num.yCoord + 1],
    )

    for (let x = num.StartingXCoord; x <= num.EndingXCoord; x++) {
      // adj coords directly above and below
      adjacentCoords.push([x, num.yCoord + 1])
      adjacentCoords.push([x, num.yCoord - 1])
    }

    return adjacentCoords
  }

  let symbolsWithMatches = [...symbolsData]
  for (let num of numsData) {
    const adjacentCoords = findAdjacentCoords(num)

    for (let adjacentCoord of adjacentCoords) {
      for (let symbol of symbolsWithMatches) {
        if (
          adjacentCoord[0] === symbol.xCoord &&
          adjacentCoord[1] === symbol.yCoord
        ) {
          symbol.matches = symbol.matches ? [...symbol.matches, num] : [num]
        }
      }
    }
  }

  validPartNumbers = []

  for (let symbolWithMatch of symbolsWithMatches) {
    if (
      symbolWithMatch.symbol === "*" &&
      symbolWithMatch.matches.length === 2
    ) {
      validPartNumbers.push(
        symbolWithMatch.matches[0].number * symbolWithMatch.matches[1].number,
      )
    }
  }

  return validPartNumbers.reduce((total, validPartNumber) => {
    return total + Number(validPartNumber)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
