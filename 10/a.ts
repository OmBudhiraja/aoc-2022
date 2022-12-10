// const input = await Deno.readTextFile('./input.txt');
const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

let x = 1;
let cycles = 0;

const signalStrength: number[] = [];

function executeOneCycle() {
  cycles++;
  if (cycles % 40 === 20 && cycles <= 220) {
    signalStrength.push(x * cycles);
  }
}

for (const line of processed) {
  const [command, value] = line.split(' ');

  executeOneCycle();

  if (command === 'addx') {
    executeOneCycle();
    x += Number(value);
  }
}

console.log(signalStrength.reduce((a, b) => a + b, 0));
