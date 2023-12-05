# 🎄 Advent of Code 2023 - day 5 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/5)

## Notes

### pseudo code / code comments that have since been removed from main js file

### first approach

for(seed of seeds){
let soil = seed-to-soilObj[seed]
let fertilizer = soil-to-fertilizer[soil]
// and so on
if soil is undefined, let soil = seed
}
then push resultant values to a result object

const mapToObject = (map) => {
takes in a map, then turns it into a dictionary
return map
}

split the input, get each map as it's own array
const seeds = [
79
14
55
13
]

remaining maps can become arrays
seed-to-soil arr = [
[50 98 2], -> seed, 50,51 becomes 98 99 soil
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

mapArrays[seed-to-soil] becomes seed-to-soil-dictionary = {
(a dictionary of seed to soil objects)

50 : 98
51: 99
}
for(seed of seeds){
let soil = seed-to-soilObj[seed]
if soil is undefined, let soil = seed
}

then push resultant values to a result object
will start with an object

### pt1 BIG REFACTOR

---

The problem : Above approach exceeds heap memory due to large numbers
creating a massive dictinary

instead of tracking exact digits in dictionary, can keep interval data and calculate desination programatically
this will use much less memory
properties: sourceStart sourceEnd and destination start
sort then binary search to find the correct range (??)
^ended up not being necessary, but would be a good time - saver
then calulate destination programatically

### pt 2 changes

---

- create another range dictionary for seeds
- go through seedRange, running findDestination for each
- keep track of lowest between seed ranges in seedRange

Possible refactor : .sort then refactor findDestination into binary search
Works without but takes around 10 minutes
