# 🎄 Advent of Code 2023 - day 9 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/9)

## Notes

- parse the input into seuqnce lines
- for each sequence, build out difference tree by:
- iterating through original line, making an array of the differences
- keep making difference arrays until tree.all(diff => diff === 0)
- find the history value by working your way back up these arrays.
- add the final number to a sum
- repeat for each line
