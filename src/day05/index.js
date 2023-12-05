import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let splitInput = input.split(":")
  splitInput = input.replace(/\n/g, "")

  const seedNumberRegex = /seeds: ([\s*\d]+)/
  const seedsRegexResult = splitInput.match(seedNumberRegex)[1]

  const seeds = seedsRegexResult.match(/[\d]+/g)

  // now get variables for each map
  const parseMapInput = (category, splitInput) => {
    const mapDigitsRegex = new RegExp(`${category} map:([\\s\\d]+)`)
    let mapDigits = splitInput.match(mapDigitsRegex)[1].trim()
    let splitMapDigits = mapDigits.split(/\s+/)
    let mapDigitsArray = []
    for (let i = 0; i < splitMapDigits.length; i += 3) {
      mapDigitsArray.push([
        splitMapDigits[i],
        splitMapDigits[i + 1],
        splitMapDigits[i + 2],
      ])
    }

    return mapDigitsArray
  }

  const categories = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ]

  const mapArrays = {}
  for (let category of categories) {
    mapArrays[category] = parseMapInput(category, splitInput)
  }
  // mapArrays look like this
  // 'seed-to-soil': [ [ '50', '98', '2' ], [ '52', '50', '48' ] ],

  // becomes seed-to-soil-dictionary = { becomes a dictionary of seed to soil objects
  //   98: 50
  //   99: 51
  // }

  const createDictionary = (mapArray) => {
    const dictionary = {}

    for (let mapSet of mapArray) {
      const destinationRangeStart = Number(mapSet[0])
      const sourceRangeStart = Number(mapSet[1])
      const rangeLength = Number(mapSet[2])

      let sourceAndDesinations = []

      for (let i = 0; i < rangeLength; i++) {
        sourceAndDesinations.push([
          sourceRangeStart + i,
          destinationRangeStart + i,
        ])
      }

      for (let sourceAndDesination of sourceAndDesinations) {
        let source = sourceAndDesination[0]
        let desination = sourceAndDesination[1]
        dictionary[source] = desination
      }
    }
    return dictionary
  }

  let dictionaries = {}

  for (let category of categories) {
    dictionaries[category] = createDictionary(mapArrays[category])
  }

  let lowestLocation = Infinity

  for (let seed of seeds) {
    let current = seed
    for (let category of categories) {
      current = dictionaries[category][current] || current
    }
    lowestLocation = Math.min(lowestLocation, current)
    // let soil = useDictionary(dictionaries, "seed-to-soil", seed)

    // const fertilizer = useDictionary(dictionaries, "soil-to-fertilizer", soil)

    // const water = useDictionary(dictionaries, "fertilizer-to-water", fertilizer)

    // const light = useDictionary(dictionaries, "water-to-light", water)

    // const temperature = useDictionary(
    //   dictionaries,
    //   "light-to-temperature",
    //   light,
    // )

    // const humidity = useDictionary(
    //   dictionaries,
    //   "temperature-to-humidity",
    //   temperature,
    // )

    // const location = useDictionary(
    //   dictionaries,
    //   "humidity-to-location",
    //   humidity,
    // )
  }
  return lowestLocation
}

/*
  for(seed of seeds){
  let soil = seed-to-soilObj[seed]
  if soil is undefined, let soil = seed
}
then push resultant values to a result object*/

// const mapToObject = (map) => {
//   // takes in a map, then turns it into a dictionary
//   return map
// }

// console.log(mapToObject())

/* split the input, get each map as it's own array
   // const seeds = [
    79
    14
    55
    13
]
DONE
remaining maps can become arrays
seed-to-soil arr = [
  [50 98 2],   ->  seed, 50,51 becomes 98 99 soil
  [52 50 48]
]
these are now properties on the mapArrays object
const mapArrays = {
  seed-to-soil:[
  [50 98 2]
  [52 50 48]
]
}

Now, create dictionaries for each mapArray

becomes seed-to-soil-dictionary = { becomes a dictionary of seed to soil objects
  50 : 98
  51: 99
}
for(seed of seeds){
  let soil = seed-to-soilObj[seed]
  if soil is undefined, let soil = seed
}

then push resultant values to a result object
will start with an object



  */

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
