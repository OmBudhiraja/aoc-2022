const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

const positionH = [0, 0]; // x, y;

const _positionT1 = [0, 0];
const _positionT2 = [0, 0];
const _positionT3 = [0, 0];
const _positionT4 = [0, 0];
const _positionT5 = [0, 0];
const _positionT6 = [0, 0];
const _positionT7 = [0, 0];
const _positionT8 = [0, 0];
const _positionT9 = [0, 0];

const visitedT9 = new Set<string>();

function moveTail(follower: number[], leader: number[]) {
  const [x, y] = leader;
  const [x2, y2] = follower;

  if ((x - x2 >= 1 && y - y2 >= 2) || (x - x2 >= 2 && y - y2 >= 1)) {
    follower[0] += 1;
    follower[1] += 1;
    return;
  }

  if ((x - x2 >= 1 && y - y2 <= -2) || (x - x2 >= 2 && y - y2 <= -1)) {
    follower[0] += 1;
    follower[1] -= 1;
    return;
  }

  if ((x - x2 <= -1 && y - y2 >= 2) || (x - x2 <= -2 && y - y2 >= 1)) {
    follower[0] -= 1;
    follower[1] += 1;
    return;
  }

  if ((x - x2 <= -1 && y - y2 <= -2) || (x - x2 <= -2 && y - y2 <= -1)) {
    follower[0] -= 1;
    follower[1] -= 1;
    return;
  }

  if (x - x2 > 1) {
    follower[0] += 1;
    return;
  }

  if (x - x2 < -1) {
    follower[0] -= 1;
    return;
  }

  if (y - y2 > 1) {
    follower[1] += 1;
    return;
  }

  if (y - y2 < -1) {
    follower[1] -= 1;
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

    for (let i = 1; i <= 9; i++) {
      moveTail(eval(`_positionT${i}`), i === 1 ? positionH : eval(`_positionT${i - 1}`));
    }

    visitedT9.add(_positionT9.join(','));
  }
});

console.log(visitedT9.size);
