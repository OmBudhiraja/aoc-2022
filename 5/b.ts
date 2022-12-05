// const input = await Deno.readTextFile('./test.txt');
const input = await Deno.readTextFile('./input.txt');

const [topHalf, reaggengementSteps] = input
  .replace(/\r/g, '') // remove all \r characters
  .split('\n\n')
  .map((line) => line.split('\n'));

const arr: { rowNr: string; index: number }[] = [];
const stackArr: { [key: string]: string[] } = {};

topHalf[topHalf.length - 1]
  .split('')
  .forEach((char, index) => char.trim() && arr.push({ rowNr: char, index }));

topHalf
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
  stackArr[to] = [...stackArr[to], ...stackArr[from].splice(-parseInt(quantityToMove))];
});

console.log(
  Object.keys(stackArr)
    .map((key) => stackArr[key][stackArr[key].length - 1])
    .join(''),
  arr
);
