const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split(''));

const common = [];
let score = 0;

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (let i = 0; i < processed.length; i++) {
  const arr = processed[i];
  const firstHalf = processed[i].slice(0, arr.length / 2);
  const secondHalf = processed[i].slice(arr.length / 2);

  for (let j = 0; j < firstHalf.length; j++) {
    const first = firstHalf[j];

    for (let k = 0; k < secondHalf.length; k++) {
      const second = secondHalf[k];

      if (first === second) {
        common[i] = first;
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
