import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const seedNumberRegex = /seeds: ([\s*\d]+)/
  const seedsRegexResult = input.match(seedNumberRegex)[1]
  const seeds = seedsRegexResult.match(/\d+/g).map(Number)

  const categories = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ]

  const createRangeDictionary = (category, input) => {
    const rangeDictionary = []
    const mapRegex = new RegExp(`${category} map:([\\s\\d]+)`)
    const mapDigits = input.match(mapRegex)[1].trim().split(/\s+/)

    for (let i = 0; i < mapDigits.length; i += 3) {
      const destinationRangeStart = Number(mapDigits[i])
      const seedRangeStart = Number(mapDigits[i + 1])
      const rangeLength = Number(mapDigits[i + 2])

      rangeDictionary.push({
        seedStart: seedRangeStart,
        seedEnd: seedRangeStart + rangeLength - 1,
        destinationStart: destinationRangeStart,
      })
    }
    return rangeDictionary
  }

  let dictionaries = {}

  for (let category of categories) {
    dictionaries[category] = createRangeDictionary(category, input)
  }

  const findDestination = (value, rangeDictionary) => {
    for (let range of rangeDictionary) {
      if (value >= range.seedStart && value <= range.seedEnd) {
        return range.destinationStart + (value - range.seedStart)
      }
    }
    // thank goodness it doesn't need a binary search
    return value
  }

  let lowestLocation = Infinity

  for (let seed of seeds) {
    let current = seed
    for (let category of categories) {
      current = findDestination(current, dictionaries[category])
    }
    lowestLocation = Math.min(lowestLocation, current)
  }

  return lowestLocation
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  // pt 2 changes
  // create another range dictionary for seeds
  // go through intervals, running findDestination for each
  // keep running total between seeds

  const seedNumberRegex = /seeds: ([\s*\d]+)/
  const seedsRegexResult = input.match(seedNumberRegex)[1]
  const seeds = seedsRegexResult.match(/\d+/g).map(Number)

  const seedMapper = (seeds) => {
    const seedsStartAndLength = []
    for (let i = 0; i < seeds.length; i += 2) {
      const seedStart = seeds[i]
      const seedLength = seeds[i + 1]
      seedsStartAndLength.push([seedStart, seedLength])
    }
    return seedsStartAndLength
  }

  const seedsRangeDictionary = seedMapper(seeds)

  const categories = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ]

  const createRangeDictionary = (category, input) => {
    const rangeDictionary = []
    const mapRegex = new RegExp(`${category} map:([\\s\\d]+)`)
    const mapDigits = input.match(mapRegex)[1].trim().split(/\s+/)

    for (let i = 0; i < mapDigits.length; i += 3) {
      const destinationRangeStart = Number(mapDigits[i])
      const seedRangeStart = Number(mapDigits[i + 1])
      const rangeLength = Number(mapDigits[i + 2])

      rangeDictionary.push({
        seedStart: seedRangeStart,
        seedEnd: seedRangeStart + rangeLength - 1,
        destinationStart: destinationRangeStart,
      })
    }
    return rangeDictionary
  }

  let dictionaries = {}

  for (let category of categories) {
    dictionaries[category] = createRangeDictionary(category, input)
  }

  const findDestination = (value, rangeDictionary) => {
    // TODO: .sort then refactor into binary search
    // works without but takes around 10 minutes

    for (let range of rangeDictionary) {
      if (value >= range.seedStart && value <= range.seedEnd) {
        return range.destinationStart + (value - range.seedStart)
      }
    }
    return value
  }

  let lowestLocation = Infinity
  for (let interval of seedsRangeDictionary) {
    const seedStart = interval[0]
    const seedLength = interval[1]

    let seedCount = 0
    while (seedCount < seedLength) {
      let current = seedStart + seedCount

      for (let category of categories) {
        current = findDestination(current, dictionaries[category])
      }
      lowestLocation = Math.min(lowestLocation, current)
      seedCount++
    }
  }
  return lowestLocation
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48

        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4

        water-to-light map:
        88 18 7
        18 25 70

        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13

        temperature-to-humidity map:
        0 69 1
        1 0 69

        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48

        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4

        water-to-light map:
        88 18 7
        18 25 70

        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13

        temperature-to-humidity map:
        0 69 1
        1 0 69

        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
