const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const common: string[] = [];
let score = 0;

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (let i = 0; i < processed.length; i += 3) {
  const firstRow = processed[i];
  const secondRow = processed[i + 1];
  const thirdRow = processed[i + 2];

  for (let j = 0; j < firstRow.length; j++) {
    const first = firstRow[j];
    for (let k = 0; k < secondRow.length; k++) {
      const second = secondRow[k];
      for (let l = 0; l < thirdRow.length; l++) {
        const third = thirdRow[l];

        if (first === second && second === third) {
          common[i] = first;
          break;
        }
      }

      if (common[i]) {
        break;
      }
    }
    if (common[i]) {
      break;
    }
  }
}

common.forEach((item) => {
  score += letters.indexOf(item) + 1;
});

console.log('score', score);
