const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .split('\n\n')
  .map((line) => line.split('\n'));

const rawStackArr = processed[0];
const reaggengementSteps = processed[1];

const arr: { rowNr: string; index: number }[] = [];
const stackArr: { [key: string]: string[] } = {};

rawStackArr[rawStackArr.length - 1]
  .split('')
  .forEach((char, index) => char.trim() && arr.push({ rowNr: char, index }));

rawStackArr
  .slice(0, -1)
  .reverse()
  .forEach((line) => {
    arr.forEach((nr) => {
      if (line[nr.index] === ' ') return;
      stackArr[nr.rowNr] = [...(stackArr[nr.rowNr] ?? []), line[nr.index]];
    });
  });

reaggengementSteps.forEach((step) => {
  const [_, quantityToMove, __, from, ___, to] = step.trim().split(' ');

  for (let i = 0; i < parseInt(quantityToMove); i++) {
    stackArr[to].push(stackArr[from].pop() ?? '');
  }
});

console.log(
  Object.keys(stackArr)
    .map((key) => stackArr[key][stackArr[key].length - 1])
    .join('')
);
