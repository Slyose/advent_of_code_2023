# 🎄 Advent of Code 2023 - day 6 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/6)

## Notes

### pt1

- holdingTime can be as low as 0 or as high at totalTime
- speed = holdingTime
- moving time = holdingTime - total time
- totalDistance = holdingTime \* movingTime
- if totalDistance > recordTime

### pt2

HANG ON...

- We only need the point at which the holdTime is too much, and the point at which it's too little, all values inbetween are winning
- Start from either end and work your way in
