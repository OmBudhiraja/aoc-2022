const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

let x = 1;
let cycles = 0;

const grid = Array(6)
  .fill(0)
  .map(() => Array(40).fill(' '));

function drawPixelAndIncrement() {
  const [row, col] = [Math.floor(cycles / 40), cycles % 40];

  if (col === x || col === x - 1 || col === x + 1) {
    grid[row][col] = 'X';
  }

  cycles++;
}

for (const line of processed) {
  const [command, value] = line.split(' ');

  drawPixelAndIncrement();

  if (command === 'addx') {
    drawPixelAndIncrement();
    x += Number(value);
  }
}

grid.forEach((row) => {
  console.log(row.join(''));
});
