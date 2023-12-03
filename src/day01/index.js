import run from "aocrunner"

const part1 = (input) => {
  let calibrationValues = input.split("\n")

  const anyDigitRegex = /[\d]/g

  let total = 0

  for (let calibrationValue of calibrationValues) {
    const digits = calibrationValue.match(anyDigitRegex)

    total += Number(digits[0] + digits[digits.length - 1])
  }

  return total
}

const part2 = (input) => {
  let total = 0

  const numWordToDigit = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  }

  let calibrationValues = input.split("\n")

  const reversedCalibrationValueRegex =
    /[\d]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g
  const calibrationValueRegex =
    /[\d]|one|two|three|four|five|six|seven|eight|nine/g

  for (let calibrationValue of calibrationValues) {
    let lastValue = calibrationValue
      .split("")
      .reverse()
      .join("")
      .match(reversedCalibrationValueRegex)[0]
      .split("")
      .reverse()
      .join("")
    // will not apologise for this

    let firstValue = calibrationValue.match(calibrationValueRegex)[0]

    firstValue = /[1-9]/.test(firstValue)
      ? firstValue
      : numWordToDigit[firstValue]
    lastValue = /[1-9]/.test(lastValue) ? lastValue : numWordToDigit[lastValue]

    total += Number(firstValue + lastValue)
  }

  return total
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: "281",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
