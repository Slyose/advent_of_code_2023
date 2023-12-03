# 🎄 Advent of Code 2023 - day 3 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/3)

## Notes

# My part 1 approach

    - Grab data from each line, for symbols and their location, and for words, positions recorded with coordinates
    - Generate an array representing which coordinates are adjacent to a number
    - decide if the number is a valid parts number by checking if there is a symbol present in the adjacent coordinates
    - sum the valid part numbers

# Part 2 approach

    - Most of the logic should remain the same
    - Except that I now need to keep more data about the partnumbers. 2 Criteria need to be tracked - what kind of symbol was matched ( * or non star), and how many pairs
    - if they matched on a * with 2, then they should be multiplied by eachother before being added to the num
    - gonna revert from the string-based comparison, to a more OOP approach where each symbol will now keep track of it's numbers. Then I can reduce the symbolsWithParts to multiply if criteria are met.
    - As a result of the refactor of part 1, this currently still tracks matches for symbols of all types, not just gears. That could be refactored out
