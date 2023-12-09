import run from "aocrunner"

const part1 = (input) => {
  const allHistories = []
  const numberRegex = /-\d+|\d+/g
  const splitInput = input.split("\n")
  for (const line of splitInput) {
    let matches = line.match(numberRegex)
    let matchesAsNumbers = []
    for (let match of matches) {
      matchesAsNumbers.push(Number(match))
    }
    allHistories.push(matchesAsNumbers)
  }

  const makeDifferenceArray = (arr) => {
    let differences = []
    for (let i = 0; i < arr.length - 1; i++) {
      differences.push(arr[i + 1] - arr[i])
    }
    return differences
  }

  function extrapolateAndSum(tree) {
    let sum = 0
    tree[tree.length - 1].push(0)

    for (let i = tree.length - 2; i >= 0; i--) {
      let belowLine = tree[i + 1]
      let currentLine = tree[i]
      let newNumber =
        currentLine[currentLine.length - 1] + belowLine[belowLine.length - 1]
      currentLine.push(newNumber)
      if (i === 0) {
        sum += newNumber
      }
    }
    return sum
  }

  let sumExtrapolated = 0

  for (let history of allHistories) {
    let historyTree = [history] //2d array representing the multiple sequences in a history
    while (!historyTree[historyTree.length - 1].every((num) => num === 0)) {
      historyTree.push(makeDifferenceArray(historyTree[historyTree.length - 1]))
    }
    let sum = extrapolateAndSum(historyTree)
    sumExtrapolated += sum
  }

  return sumExtrapolated
}

const part2 = (input) => {
  const allHistories = []
  const numberRegex = /-\d+|\d+/g
  const splitInput = input.split("\n")
  for (const line of splitInput) {
    let matches = line.match(numberRegex)
    let matchesAsNumbers = []
    for (let match of matches) {
      matchesAsNumbers.push(Number(match))
    }
    allHistories.push(matchesAsNumbers)
  }

  const makeDifferenceArray = (arr) => {
    let differences = []
    for (let i = 0; i < arr.length - 1; i++) {
      differences.push(arr[i + 1] - arr[i])
    }
    return differences
  }

  function leftExtrapolateAndSum(tree) {
    let sum = 0
    tree[tree.length - 1].unshift(0)

    for (let i = tree.length - 2; i >= 0; i--) {
      let belowLine = tree[i + 1]
      let currentLine = tree[i]
      let newNumber = parseInt(currentLine[0]) - (parseInt(belowLine[0]) || 0)
      currentLine.unshift(newNumber)
      if (i === 0) {
        sum += newNumber
      }
    }
    return sum
  }

  let sumExtrapolated = 0

  for (let history of allHistories) {
    let historyTree = [history] //2d array representing the multiple sequences in a history
    while (!historyTree[historyTree.length - 1].every((num) => num === 0)) {
      historyTree.push(makeDifferenceArray(historyTree[historyTree.length - 1]))
    }
    let sum = leftExtrapolateAndSum(historyTree)
    sumExtrapolated += sum
  }

  return sumExtrapolated
}

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
