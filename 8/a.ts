const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split('').map((s) => parseInt(s, 10)));

let visibleTress = 0;

for (let i = 0; i < processed.length; i++) {
  const currentRow = processed[i];

  for (let j = 0; j < currentRow.length; j++) {
    const curValue = currentRow[j];

    // check for top
    let topPointer = i;
    let isVisibleFromTop = true;
    while (topPointer !== 0) {
      topPointer--;
      if (processed[topPointer][j] >= curValue) {
        isVisibleFromTop = false;
        break;
      }
    }

    if (isVisibleFromTop) {
      visibleTress++;
      continue;
    }

    // check for right
    let rightPointer = j;
    let isVisibleFromRight = true;

    while (rightPointer !== currentRow.length - 1) {
      rightPointer++;

      if (processed[i][rightPointer] >= curValue) {
        isVisibleFromRight = false;
        break;
      }
    }

    if (isVisibleFromRight) {
      visibleTress++;
      continue;
    }

    // check for bottom
    let bottomPointer = i;
    let isVisibleFromBottom = true;
    while (bottomPointer !== processed.length - 1) {
      bottomPointer++;

      if (processed[bottomPointer][j] >= curValue) {
        isVisibleFromBottom = false;
        break;
      }
    }

    if (isVisibleFromBottom) {
      visibleTress++;
      continue;
    }

    // check for left
    let leftPointer = j;
    let isVisibleFromLeft = true;

    while (leftPointer !== 0) {
      leftPointer--;

      if (processed[i][leftPointer] >= curValue) {
        isVisibleFromLeft = false;
        break;
      }
    }

    if (isVisibleFromLeft) {
      visibleTress++;
      continue;
    }
  }
}

console.log(visibleTress);
