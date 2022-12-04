const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split(','));

let duplicates = 0;

function getPairArr(str: string) {
  const arr = str.split('-');
  return Array(Number(arr[1]) - Number(arr[0]) + 1)
    .fill(0)
    .map((_, i) => Number(arr[0]) + i);
}

for (let i = 0; i < processed.length; i++) {
  const firstPair = getPairArr(processed[i][0]);
  const secondPair = getPairArr(processed[i][1]);

  if (firstPair.length > secondPair.length) {
    secondPair.some((el) => firstPair.includes(el)) && duplicates++;
  } else {
    firstPair.some((el) => secondPair.includes(el)) && duplicates++;
  }
}

console.log(duplicates);
