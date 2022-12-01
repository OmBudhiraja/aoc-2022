const input = await Deno.readTextFile('./input.txt');

const processed = input
  .split(/\n\s*\n/)
  .map((line) => line.split('\n').map((s) => parseInt(s, 10)));

let highest = 0;
const totals = [];

for (let i = 0; i < processed.length; i++) {
  const set = processed[i];
  const calories = set.reduce((acc, curr) => acc + curr, 0);
  totals.push(calories);

  if (calories > highest) {
    highest = calories;
  }
}

console.log('highest', highest);
