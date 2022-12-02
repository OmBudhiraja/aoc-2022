const input = await Deno.readTextFile('./input.txt');

const processed = input.split('\n').map((line) => line.split(' '));

const scoreMaps = { A: 1, B: 2, C: 3 };

const drawPoint = 3;
const winPoint = 6;

let totalScore = 0;

for (let i = 0; i < processed.length; i++) {
  const opponent = processed[i][0].trim();
  const roundResult = processed[i][1].trim();
  let yours = '';

  // lose
  if (roundResult === 'X') {
    yours = opponent === 'A' ? 'C' : opponent === 'B' ? 'A' : 'B';
  }

  // draw
  if (roundResult === 'Y') {
    totalScore += drawPoint;
    yours = opponent;
  }

  // win
  if (roundResult === 'Z') {
    totalScore += winPoint;
    yours = opponent === 'A' ? 'B' : opponent === 'B' ? 'C' : 'A';
  }

  totalScore += scoreMaps[yours as 'A' | 'B' | 'C'];
}

console.log('totalScore', totalScore);
