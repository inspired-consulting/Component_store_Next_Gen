const y = thirdExample;

const arr1 = [1, 2, [3], [4, 5], 6, []];

const flattened = arr1.flatMap((num) => num);

console.log(flattened);

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"

