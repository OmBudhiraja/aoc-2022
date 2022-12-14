const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

const ropePos = Array(10)
  .fill(null)
  .map(() => [0, 0]);

const visitedT9 = new Set<string>();

function moveTail(follower: number[], leader: number[]) {
  const [x, y] = leader;
  const [x2, y2] = follower;

  const shouldMove = Math.max(Math.abs(x - x2), Math.abs(y - y2)) > 1;

  if (shouldMove) {
    follower[0] += Math.sign(x - x2);
    follower[1] += Math.sign(y - y2);
  }
}

processed.forEach((line) => {
  const [direction, steps] = line.split(' ');

  for (let i = 0; i < Number(steps); i++) {
    if (direction === 'R') ropePos[0][0] += 1;
    if (direction === 'L') ropePos[0][0] -= 1;
    if (direction === 'U') ropePos[0][1] += 1;
    if (direction === 'D') ropePos[0][1] -= 1;

    for (let ropeNr = 1; ropeNr <= ropePos.length - 1; ropeNr++) {
      moveTail(ropePos[ropeNr], ropePos[ropeNr - 1]);
    }

    visitedT9.add(ropePos[ropePos.length - 1].join(','));
  }
});

console.log(visitedT9.size);
