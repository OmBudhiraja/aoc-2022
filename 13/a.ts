// const input = await Deno.readTextFile('./input.txt');
const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n\n')
  .map((line) => line.split('\n').map((line) => line.slice(1, -1).split(',')));

// console.log(processed);

const currectOrderPairs = [];

processed.forEach((group, index) => {
  // for(let i = 0; i < group.length; i++) {

  // }
  console.log(group[0].length, group[1].length, group);
});
