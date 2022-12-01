const input = await Deno.readTextFile('./input.txt');

const processed = input
  .split(/\n\s*\n/)
  .map((line) => line.split('\n').map((s) => parseInt(s, 10)));

const totals = [];

for (let i = 0; i < processed.length; i++) {
  const set = processed[i];
  const calories = set.reduce((acc, curr) => acc + curr, 0);
  totals.push(calories);
}

const sorted = totals.sort((a, b) => a - b);
const sumTop3 = sorted.slice(-3).reduce((acc, curr) => acc + curr, 0);

console.log('highest', sumTop3);
