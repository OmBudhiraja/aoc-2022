const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

const positionH = [0, 0]; // x, y;
const positionT = [0, 0];

const visitedT = new Set<string>();

function moveTail() {
  const [x, y] = positionH;
  const [x2, y2] = positionT;

  if ((x - x2 >= 1 && y - y2 >= 2) || (x - x2 >= 2 && y - y2 >= 1)) {
    positionT[0] += 1;
    positionT[1] += 1;
    return;
  }

  if ((x - x2 >= 1 && y - y2 <= -2) || (x - x2 >= 2 && y - y2 <= -1)) {
    positionT[0] += 1;
    positionT[1] -= 1;
    return;
  }

  if ((x - x2 <= -1 && y - y2 >= 2) || (x - x2 <= -2 && y - y2 >= 1)) {
    positionT[0] -= 1;
    positionT[1] += 1;
    return;
  }

  if ((x - x2 <= -1 && y - y2 <= -2) || (x - x2 <= -2 && y - y2 <= -1)) {
    positionT[0] -= 1;
    positionT[1] -= 1;
    return;
  }

  if (x - x2 > 1) {
    positionT[0] += 1;
    return;
  }

  if (x - x2 < -1) {
    positionT[0] -= 1;
    return;
  }

  if (y - y2 > 1) {
    positionT[1] += 1;
    return;
  }

  if (y - y2 < -1) {
    positionT[1] -= 1;
    return;
  }
}

processed.forEach((line) => {
  const [direction, steps] = line.split(' ');

  for (let i = 0; i < Number(steps); i++) {
    if (direction === 'R') positionH[0] += 1;
    if (direction === 'L') positionH[0] -= 1;
    if (direction === 'U') positionH[1] += 1;
    if (direction === 'D') positionH[1] -= 1;

    moveTail();

    visitedT.add(positionT.join(','));
  }
});

console.log(visitedT.size);
