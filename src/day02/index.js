import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const gamesArray = rawInput.split("\n")
  const blueRegex = /([\d]+)\sblue/g
  const greenRegex = /([\d]+)\sgreen/g
  const redRegex = /([\d]+)\sred/g

  let validGames = []

  for (let game of gamesArray) {

    const blueMatches = game.match(blueRegex)
    const highestBlue = blueMatches.reduce((total, blueMatchStr) => {
      return total < parseInt(blueMatchStr) ? parseInt(blueMatchStr) : total
    }, 0)

    const redMatches = game.match(redRegex)
    const highestRed = redMatches.reduce((total, redMatchStr) => {
      return total < parseInt(redMatchStr) ? parseInt(redMatchStr) : total
    }, 0)

    const greenMatches = game.match(greenRegex)
    const highestGreen = greenMatches.reduce((total, greenMatchStr) => {
      return total < parseInt(greenMatchStr) ? parseInt(greenMatchStr) : total
    }, 0)

    if (highestBlue <= 14 && highestRed <= 12 && highestGreen <= 13) {
      validGames.push(game)
    }
  }

  let sumValidGamesID = 0
  
  for (let validGame of validGames) {
    sumValidGamesID += Number(validGame.match(/[\d]+/g)[0])
  }

  return sumValidGamesID
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const gamesArray = rawInput.split("\n")
  const blueRegex = /([\d]+)\sblue/g
  const greenRegex = /([\d]+)\sgreen/g
  const redRegex = /([\d]+)\sred/g

  let sumOfPowers = 0

  for (let game of gamesArray) {

    const blueMatches = game.match(blueRegex)
    const highestBlue = blueMatches.reduce((total, blueMatchStr) => {
      return total < parseInt(blueMatchStr) ? parseInt(blueMatchStr) : total
    }, 0)

    const redMatches = game.match(redRegex)
    const highestRed = redMatches.reduce((total, redMatchStr) => {
      return total < parseInt(redMatchStr) ? parseInt(redMatchStr) : total
    }, 0)

    const greenMatches = game.match(greenRegex)
    const highestGreen = greenMatches.reduce((total, greenMatchStr) => {
      return total < parseInt(greenMatchStr) ? parseInt(greenMatchStr) : total
    }, 0)


    let power = highestBlue * highestRed * highestGreen

    sumOfPowers += power
  }

  return sumOfPowers
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
