import run from "aocrunner"

const part1 = (input) => {
  const splitInput = input.split("\n")
  const timeLine = splitInput[0]
  const distanceLine = splitInput[1]
  const timeValues = timeLine.match(/\d+/g)
  const distanceValues = distanceLine.match(/\d+/g)

  let waysToWinAllRaces = []

  for (let i = 0; i < timeValues.length; i++) {
    let totalTime = timeValues[i]
    let distanceToBeat = distanceValues[i]
    let currentHoldingTimeTest = 0
    let waysToWin = 0

    while (currentHoldingTimeTest < totalTime) {
      const movingTime = totalTime - currentHoldingTimeTest
      const totalDistance = currentHoldingTimeTest * movingTime
      if (totalDistance > distanceToBeat) {
        waysToWin++
      }
      currentHoldingTimeTest++
    }
    waysToWinAllRaces.push(waysToWin)
  }
  return waysToWinAllRaces.reduce((total, waysToWinARace) => {
    return (total *= waysToWinARace)
  }, 1)
}

const part2 = (input) => {
  const splitInput = input.split("\n")
  const timeLine = splitInput[0]
  const distanceLine = splitInput[1]
  const totalTime = timeLine.match(/\d+/g).join("")
  const distanceToBeat = distanceLine.match(/\d+/g).join("")

  let firstWinningHoldTime = null
  let lastWinningHoldTime = null

  for (let testTime = 0; firstWinningHoldTime === null; testTime++) {
    const movingTime = totalTime - testTime
    const totalDistance = testTime * movingTime
    if (totalDistance > distanceToBeat) {
      firstWinningHoldTime = testTime
    }
  }

  for (let testTime = totalTime - 1; lastWinningHoldTime === null; testTime--) {
    const movingTime = totalTime - testTime
    const totalDistance = testTime * movingTime
    if (totalDistance > distanceToBeat) {
      lastWinningHoldTime = testTime
    }
  }

  return lastWinningHoldTime - firstWinningHoldTime + 1
}

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
        Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
        Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
