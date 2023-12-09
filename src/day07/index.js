import run from "aocrunner"

const part1 = (input) => {
  const splitInput = input.split("\n")
  const allHands = []
  const allHandsSorted = []
  const winTypes = [
    "fiveOfAKinds",
    "fourOfAKinds",
    "fullHouses",
    "threeOfAKinds",
    "twoPairs",
    "onePairs",
    "highCards",
  ]
  const types = {
    fiveOfAKinds: [],
    fourOfAKinds: [],
    fullHouses: [],
    threeOfAKinds: [],
    twoPairs: [],
    onePairs: [],
    highCards: [],
  }
  const strengthArr = "AKQJT98765432".split("")
  // make every pair an object
  for (const handStr of splitInput) {
    let handAndBid = handStr.trim().split(" ")
    allHands.push({ cards: handAndBid[0], bid: handAndBid[1] })
  }

  const cardCounter = (hand) => {
    const cards = hand.cards
    let cardCount = {}
    for (let card of cards) {
      cardCount[card] = (cardCount[card] || 0) + 1
    }
    return cardCount
  }

  const isFiveOfAKind = (cardCount) => {
    for (let count in cardCount) {
      if (cardCount[count] === 5) {
        return true
      }
      return false
    }
  }

  const isFourOfAKind = (cardCount) => {
    for (let count in cardCount) {
      if (cardCount[count] === 4) {
        return true
      }
    }
    return false
  }

  const isFullHouse = (cardCount) => {
    const values = []
    for (let char in cardCount) {
      values.push(cardCount[char])
    }
    if (values.includes(3) && values.includes(2)) {
      return true
    } else return false
  }

  const isThreeOfAKind = (cardCount) => {
    const values = []
    for (let char in cardCount) {
      values.push(cardCount[char])
    }
    if (values.includes(3) && values.includes(1)) {
      return true
    } else return false
  }

  const isTwoPair = (cardCount) => {
    let pairCount = 0
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 2) {
        pairCount++
      } else if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (pairCount === 2 && singleCount === 1) {
      return true
    } else return false
  }

  const isOnePair = (cardCount) => {
    let pairCount = 0
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 2) {
        pairCount++
      } else if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (pairCount === 1 && singleCount === 3) {
      return true
    } else return false
  }

  const isHighCard = (cardCount) => {
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (singleCount === 5) {
      return true
    } else return false
  }

  while (allHands.length) {
    let currentCard = allHands.shift()
    findType(currentCard)
    if (currentCard.type === "Five of a kind") {
      types.fiveOfAKinds.push(currentCard)
    } else if (currentCard.type === "Four of a kind") {
      types.fourOfAKinds.push(currentCard)
    } else if (currentCard.type === "Full house") {
      types.fullHouses.push(currentCard)
    } else if (currentCard.type === "Three of a kind") {
      types.threeOfAKinds.push(currentCard)
    } else if (currentCard.type === "Two pair") {
      types.twoPairs.push(currentCard)
    } else if (currentCard.type === "One pair") {
      types.onePairs.push(currentCard)
    } else if (currentCard.type === "High card") {
      types.highCards.push(currentCard)
    }
  }
  const arraySorter = (typeArr) => {
    const strenghCompare = (a, b) => {
      for (let i = 0; i < a.cards.length; i++) {
        let aChar = a.cards[i]
        let bChar = b.cards[i]
        if (strengthArr.indexOf(aChar) > strengthArr.indexOf(bChar)) {
          return 1
        } else if (strengthArr.indexOf(aChar) < strengthArr.indexOf(bChar)) {
          return -1
        }
      }
    }
    typeArr.sort(strenghCompare)
  }

  for (let typeArr in types) {
    arraySorter(types[typeArr])
  }

  for (let type of winTypes) {
    for (let card of types[type]) {
      allHandsSorted.push(card)
    }
  }

  for (let i = 0; i < allHandsSorted.length; i++) {
    allHandsSorted[i].rank = allHandsSorted.length - i
  }

  // function to to find out which type, then attach type to the hand object
  function findType(hand) {
    let cardCount = cardCounter(hand)
    if (isFiveOfAKind(cardCount)) {
      hand.type = "Five of a kind"
    } else if (isFourOfAKind(cardCount)) {
      hand.type = "Four of a kind"
    } else if (isFullHouse(cardCount)) {
      hand.type = "Full house"
    } else if (isThreeOfAKind(cardCount)) {
      hand.type = "Three of a kind"
    } else if (isTwoPair(cardCount)) {
      hand.type = "Two pair"
    } else if (isOnePair(cardCount)) {
      hand.type = "One pair"
    } else if (isHighCard(cardCount)) {
      hand.type = "High card"
    }
  }

  // make an array of objects for each type
  // make an array for the relative strengths in order to sort each typeArray
  // in order of strength, push the objects one by one to a finalArray (starting with the strongest type)
  return allHandsSorted.reduce((totalWinnings, hand) => {
    const winningsForHand = hand.bid * hand.rank
    return (totalWinnings += winningsForHand)
  }, 0)
}

const part2 = (input) => {
  const splitInput = input.split("\n")
  const allHands = []
  const allHandsSorted = []
  const winTypes = [
    "fiveOfAKinds",
    "fourOfAKinds",
    "fullHouses",
    "threeOfAKinds",
    "twoPairs",
    "onePairs",
    "highCards",
  ]
  const typesStrengths = [
    "High card",
    "One pair",
    "Two pair",
    "Three of a kind",
    "Full house",
    "Four of a kind",
    "Five of a kind",
  ]
  const types = {
    fiveOfAKinds: [],
    fourOfAKinds: [],
    fullHouses: [],
    threeOfAKinds: [],
    twoPairs: [],
    onePairs: [],
    highCards: [],
  }
  const strengthArr = "AKQT98765432J".split("")
  // make every pair an object
  for (const handStr of splitInput) {
    let handAndBid = handStr.trim().split(" ")
    allHands.push({ cards: handAndBid[0], bid: handAndBid[1] })
  }

  const cardCounter = (hand) => {
    const cards = hand.cards
    let cardCount = {}
    for (let card of cards) {
      cardCount[card] = (cardCount[card] || 0) + 1
    }
    return cardCount
  }

  const isFiveOfAKind = (cardCount) => {
    for (let count in cardCount) {
      if (cardCount[count] === 5) {
        return true
      }
      return false
    }
  }

  const isFourOfAKind = (cardCount) => {
    for (let count in cardCount) {
      if (cardCount[count] === 4) {
        return true
      }
    }
    return false
  }

  const isFullHouse = (cardCount) => {
    const values = []
    for (let char in cardCount) {
      values.push(cardCount[char])
    }
    if (values.includes(3) && values.includes(2)) {
      return true
    } else return false
  }

  const isThreeOfAKind = (cardCount) => {
    const values = []
    for (let char in cardCount) {
      values.push(cardCount[char])
    }
    if (values.includes(3) && values.includes(1)) {
      return true
    } else return false
  }

  const isTwoPair = (cardCount) => {
    let pairCount = 0
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 2) {
        pairCount++
      } else if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (pairCount === 2 && singleCount === 1) {
      return true
    } else return false
  }

  const isOnePair = (cardCount) => {
    let pairCount = 0
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 2) {
        pairCount++
      } else if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (pairCount === 1 && singleCount === 3) {
      return true
    } else return false
  }

  const isHighCard = (cardCount) => {
    let singleCount = 0
    for (let char in cardCount) {
      if (cardCount[char] === 1) {
        singleCount++
      }
    }
    if (singleCount === 5) {
      return true
    } else return false
  }

  while (allHands.length) {
    let currentCard = allHands.shift()

    if (currentCard.cards.split("").includes("J")) {
      console.log({ currentCard })
      let possibleTypes = []
      let strongestHand = {}
      for (let letter of strengthArr) {
        let possibleJokerCard = {
          cards: currentCard.cards.replace(/J/g, letter),
          bid: currentCard.bid,
        }
        findType(possibleJokerCard)
        console.log({ possibleJokerCard })
        console.log({ strongestHand })
        if (
          typesStrengths.indexOf(possibleJokerCard.type) >
          typesStrengths.indexOf(strongestHand.type)
        ) {
          console.log(
            `joker type was ${
              possibleJokerCard.type
            }, with an index of ${typesStrengths.indexOf(
              possibleJokerCard.type,
            )}`,
          )
          console.log(
            `type of strongestHand was ${
              strongestHand.type
            }, with an index of ${typesStrengths.indexOf(strongestHand.type)}`,
          )
          strongestHand = possibleJokerCard
          console.log(`So strongesthand is now ${strongestHand}`)
          console.log({ strongestHand })
        }
      }
      if (strongestHand.type === "Five of a kind") {
        types.fiveOfAKinds.push({ ...currentCard, type: "Five of a kind" })
      } else if (strongestHand.type === "Four of a kind") {
        types.fourOfAKinds.push({ ...currentCard, type: "Four of a kind" })
      } else if (strongestHand.type === "Full house") {
        types.fullHouses.push({ ...currentCard, type: "Full house" })
      } else if (strongestHand.type === "Three of a kind") {
        types.threeOfAKinds.push({ ...currentCard, type: "Three of a kind" })
      } else if (strongestHand.type === "Two pair") {
        types.twoPairs.push({ ...currentCard, type: "Two pair" })
      } else if (strongestHand.type === "One pair") {
        types.onePairs.push({ ...currentCard, type: "One pair" })
      } else if (strongestHand.type === "High card") {
        types.highCards.push({ ...currentCard, type: "High card" })
      }
    } else {
      findType(currentCard)
      if (currentCard.type === "Five of a kind") {
        types.fiveOfAKinds.push(currentCard)
      } else if (currentCard.type === "Four of a kind") {
        types.fourOfAKinds.push(currentCard)
      } else if (currentCard.type === "Full house") {
        types.fullHouses.push(currentCard)
      } else if (currentCard.type === "Three of a kind") {
        types.threeOfAKinds.push(currentCard)
      } else if (currentCard.type === "Two pair") {
        types.twoPairs.push(currentCard)
      } else if (currentCard.type === "One pair") {
        types.onePairs.push(currentCard)
      } else if (currentCard.type === "High card") {
        types.highCards.push(currentCard)
      }
    }
  }
  const arraySorter = (typeArr) => {
    const strenghCompare = (a, b) => {
      for (let i = 0; i < a.cards.length; i++) {
        let aChar = a.cards[i]
        let bChar = b.cards[i]
        if (strengthArr.indexOf(aChar) > strengthArr.indexOf(bChar)) {
          return 1
        } else if (strengthArr.indexOf(aChar) < strengthArr.indexOf(bChar)) {
          return -1
        }
      }
    }
    typeArr.sort(strenghCompare)
  }

  for (let typeArr in types) {
    arraySorter(types[typeArr])
  }

  for (let type of winTypes) {
    for (let card of types[type]) {
      allHandsSorted.push(card)
    }
  }

  for (let i = 0; i < allHandsSorted.length; i++) {
    allHandsSorted[i].rank = allHandsSorted.length - i
  }

  // function to to find out which type, then attach type to the hand object
  function findType(hand) {
    let cardCount = cardCounter(hand)
    if (isFiveOfAKind(cardCount)) {
      hand.type = "Five of a kind"
    } else if (isFourOfAKind(cardCount)) {
      hand.type = "Four of a kind"
    } else if (isFullHouse(cardCount)) {
      hand.type = "Full house"
    } else if (isThreeOfAKind(cardCount)) {
      hand.type = "Three of a kind"
    } else if (isTwoPair(cardCount)) {
      hand.type = "Two pair"
    } else if (isOnePair(cardCount)) {
      hand.type = "One pair"
    } else if (isHighCard(cardCount)) {
      hand.type = "High card"
    }
  }

  console.log({ allHandsSorted })

  return allHandsSorted.reduce((totalWinnings, hand) => {
    const winningsForHand = hand.bid * hand.rank
    return (totalWinnings += winningsForHand)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1, // 248708746 is too high //
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
