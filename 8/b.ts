const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split('').map((s) => parseInt(s, 10)));

let bestScore = 0;

for (let i = 1; i < processed.length - 1; i++) {
  const currentRow = processed[i];

  for (let j = 1; j < currentRow.length - 1; j++) {
    const curValue = currentRow[j];

    // check for top
    let topPointer = i;
    let topScore = 0;
    while (topPointer !== 0) {
      topPointer--;
      topScore++;

      if (processed[topPointer][j] >= curValue) {
        break;
      }
    }

    // check for right
    let rightPointer = j;
    let rightScore = 0;

    while (rightPointer !== currentRow.length - 1) {
      rightPointer++;
      rightScore++;

      if (processed[i][rightPointer] >= curValue) {
        break;
      }
    }

    // check for bottom
    let bottomPointer = i;
    let bottomScore = 0;
    while (bottomPointer !== processed.length - 1) {
      bottomPointer++;
      bottomScore++;

      if (processed[bottomPointer][j] >= curValue) {
        break;
      }
    }

    // check for left
    let leftPointer = j;
    let leftScore = 0;

    while (leftPointer !== 0) {
      leftPointer--;
      leftScore++;

      if (processed[i][leftPointer] >= curValue) {
        break;
      }
    }

    const scenicScore = topScore * rightScore * bottomScore * leftScore;
    if (scenicScore > bestScore) {
      bestScore = scenicScore;
    }
  }
}

console.log(bestScore);
