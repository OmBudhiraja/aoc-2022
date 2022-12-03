const input = await Deno.readTextFile('./input.txt');

const processed = input.split('\n').map((line) => line.split(' '));

const maps = { A: 'rock', B: 'paper', C: 'scissors', X: 'rock', Y: 'paper', Z: 'scissors' };
const scoreMaps = { X: 1, Y: 2, Z: 3 };

const drawPoint = 3;
const winPoint = 6;

let totalScore = 0;

for (let i = 0; i < processed.length; i++) {
  const opponent = processed[i][0].trim() as 'A' | 'B' | 'C';
  const yours = processed[i][1].trim() as 'X' | 'Y' | 'Z';

  totalScore += scoreMaps[yours];

  if (maps[opponent] === maps[yours]) {
    totalScore += drawPoint;
    continue;
  }

  if (maps[opponent] === 'rock' && maps[yours] === 'paper') {
    totalScore += winPoint;
    continue;
  }

  if (maps[opponent] === 'paper' && maps[yours] === 'scissors') {
    totalScore += winPoint;
    continue;
  }

  if (maps[opponent] === 'scissors' && maps[yours] === 'rock') {
    totalScore += winPoint;
    continue;
  }
}

console.log('totalScore', totalScore);
