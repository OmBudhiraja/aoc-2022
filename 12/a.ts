// const input = await Deno.readTextFile('./input.txt');
const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const highestElevationIndex = processed.findIndex((line) => line.includes('E'));

console.log(highestElevationIndex);
