import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (input) => {
  let splitInput = input.split("\n")
  const instructions = splitInput[0].split("")
  const nodeRegex = /([A-Z]+)/g
  let nodes = {}
  let currentNode = {}
  let count = 0

  for (let i = 1; i < splitInput.length; i++) {
    if (splitInput[i] !== "") {
      const nodesData = splitInput[i].match(nodeRegex)

      nodes[nodesData[0]] = { leftNode: nodesData[1], rightNode: nodesData[2] }
      if (i === 2) {
        currentNode = nodes[nodesData[0]]
      }
    }
  }

  currentNode = nodes["AAA"]

  for (let i = 0; i < instructions.length; i++) {
    count++
    if (instructions[i] === "L") {
      if (currentNode.leftNode === "ZZZ") {
        return count
      }
      currentNode = nodes[currentNode.leftNode]
    } else if (instructions[i] === "R") {
      if (currentNode.rightNode === "ZZZ") {
        return count
      }
      currentNode = nodes[currentNode.rightNode]
    }
    if (i === instructions.length - 1) {
      i = -1
    }
  }
}

const part2 = (input) => {
  let splitInput = input.split("\n")
  const instructions = splitInput[0].split("")
  const ghostNodeRegex = /[\d\w]{3}/g
  let nodes = {}
  let startingNodes = []
  let counts = []

  for (let i = 2; i < splitInput.length; i++) {
    const ghostNodeData = splitInput[i].trim().match(ghostNodeRegex)

    nodes[ghostNodeData[0]] = {
      leftNode: ghostNodeData[1],
      rightNode: ghostNodeData[2],
    }
  }
  let nodeKeys = Object.keys(nodes)
  const startingNodeKeys = nodeKeys.filter((node) => node.endsWith("A"))
  for (const key of startingNodeKeys) {
    startingNodes.push(nodes[key])
  }

  for (let node of startingNodes) {
    let count = 0
    let currentNode = node
    let foundCount = false
    while (!foundCount) {
      for (let i = 0; i < instructions.length; i++) {
        count++
        if (instructions[i] === "L") {
          if (currentNode.leftNode.endsWith("Z")) {
            counts.push(count)
            foundCount = true
            i = instructions.length // loop will terminate
          }
          currentNode = nodes[currentNode.leftNode]
        } else if (instructions[i] === "R") {
          if (currentNode.rightNode.endsWith("Z")) {
            counts.push(count)
            foundCount = true
            i = instructions.length // loop will terminate
          }
          currentNode = nodes[currentNode.rightNode]
        }

        if (i === instructions.length - 1) {
          i = -1
        }
      }
    }
  }

  // now we must find the lcm
  // i googled 'lcm function' and found this
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
  return counts.reduce((multiple, n) => (multiple * n) / gcd(multiple, n), 1)
}

const part2BruteForce = (input) => {
  let splitInput = input.split("\n")
  const instructions = splitInput[0].split("")
  const ghostNodeRegex = /[\d\w]{3}/g
  let nodes = {}
  let currentNodes = []
  let count = 0

  for (let i = 2; i < splitInput.length; i++) {
    const ghostNodeData = splitInput[i].trim().match(ghostNodeRegex)

    nodes[ghostNodeData[0]] = {
      leftNode: ghostNodeData[1],
      rightNode: ghostNodeData[2],
    }
  }
  let nodeKeys = Object.keys(nodes)
  const startingNodeKeys = nodeKeys.filter((node) => node.endsWith("A"))
  for (const key of startingNodeKeys) {
    currentNodes.push(nodes[key])
  }

  // now, we ues the instructions to dynamically take left and right paths for all nodes
  // ++ count
  // after taking a path, check if every ends in a Z, if so return count

  for (let i = 0; i < instructions.length; i++) {
    count++
    const targetNodeKeys = []
    let newNodes = []
    if (instructions[i] === "L") {
      for (let node of currentNodes) {
        targetNodeKeys.push(node.leftNode)
      }
      if (targetNodeKeys.every((key) => String(key).endsWith("Z"))) {
        return count
      } else {
        for (let targetKey of targetNodeKeys) {
          newNodes.push(nodes[targetKey])
        }
        currentNodes = newNodes
      }
    } else if (instructions[i] === "R") {
      for (let node of currentNodes) {
        targetNodeKeys.push(node.rightNode)
      }
      if (targetNodeKeys.every((key) => String(key).endsWith("Z"))) {
        return count
      } else {
        for (let targetKey of targetNodeKeys) {
          newNodes.push(nodes[targetKey])
        }
        currentNodes = newNodes
      }
    }

    if (i === instructions.length - 1) {
      i = -1
    }
  }
}

run({
  part1: {
    tests: [
      {
        input: `RL
        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR
        AAA = (CCC, BBB)
        BBB = (CCC, DDD)
        CCC = (BBB, ZZZ)
        DDD = (BBB, AAA)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
