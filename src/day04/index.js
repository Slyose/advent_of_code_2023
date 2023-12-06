import run from "aocrunner"

const part1 = (input) => {
  const cardsArr = input.split("\n")

  let total = 0

  for (let card of cardsArr) {
    let splitCard = card.split("|")
    let winningNumbers = splitCard[0].split(":")[1].match(/[\d]+/g)
    let numbersIHave = splitCard[1].match(/[\d]+/g)

    const winningNumbersIHave = []

    for (let winningNumber of winningNumbers) {
      if (numbersIHave.includes(winningNumber))
        winningNumbersIHave.push(winningNumber)
    }

    let cardPoints = 0

    let multiplier = 1

    for (let i = 0; i < winningNumbersIHave.length; i++) {
      cardPoints = multiplier
      multiplier *= 2
    }
    total += cardPoints
  }

  return total
}

const part2 = (input) => {
  const originalCards = input.split("\n")

  let liveCards = []

  let totalScratchcards = 0

  for (let card of originalCards) {
    const cardNumber = card.match(/[\d]+/g)[0]

    let splitCard = card.split("|")
    let winningNumbers = splitCard[0].split(":")
    winningNumbers = winningNumbers[1].match(/[\d]+/g)
    let numbersIHave = splitCard[1].match(/[\d]+/g)
    liveCards.push({
      cardNumber,
      winningNumbers,
      numbersIHave,
      quantity: 1,
    })
  }

  while (liveCards.length) {
    let currentCard = liveCards.shift()
    let { cardNumber, winningNumbers, numbersIHave, quantity } = currentCard

    let winningNumbersIHave = []

    for (let winningNumber of winningNumbers) {
      if (numbersIHave.includes(winningNumber))
        winningNumbersIHave.push(winningNumber)
    }

    let copyNumbers = []
    let numberOfMatches = winningNumbersIHave.length

    if (numberOfMatches > 0) {
      // this part figures out the cardNumbers of the cards that should be copied
      for (
        let currentCopyNumber = Number(cardNumber) + 1;
        Number(currentCopyNumber) <= Number(cardNumber) + Number(numberOfMatches);
        currentCopyNumber++
      ) {
        copyNumbers.push(currentCopyNumber)
      }
    }

    for (let copyNumber of copyNumbers) {
      let copyCard = liveCards.find((card) => {
        return card.cardNumber == copyNumber
      })
      //each card has a quantity property of how many there are
      // i take the impact that 1 card would have had and do it ${quantity} times
      copyCard.quantity += currentCard.quantity
    }

    totalScratchcards += quantity
  }

  return totalScratchcards
}

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
