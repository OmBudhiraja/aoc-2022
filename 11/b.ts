const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n\n');

const items = Array(processed.length)
  .fill(null)
  .map((_, i) =>
    processed[i].split('\n')[1].split(':')[1].trim().replace(/"/g, '').split(',').map(Number)
  );

const globalMod = processed.reduce((a, b) => a * +getLastElement(b.split('\n')[3]), 1);

const inspected = Array(processed.length)
  .fill(0)
  .map(() => 0);

function getLastElement(str: string) {
  const splited = str.trim().split(' ');
  return splited[splited.length - 1];
}

for (let i = 0; i < 10000; i++) {
  for (const data of processed) {
    const lines = data.split('\n');
    const monkeyNr = +lines[0].split(' ')[1].replace(':', '');

    while (items[monkeyNr].length > 0) {
      inspected[monkeyNr]++;

      const item = items[monkeyNr][0];

      const [operator, amount] = lines[2].split(' ').slice(-2);
      const parsedAmount = amount === 'old' ? item : +amount;

      let worryLevel: number;

      if (operator === '+') worryLevel = item + parsedAmount;
      else if (operator === '*') worryLevel = item * parsedAmount;
      else throw new Error('Unknown operator');

      worryLevel = worryLevel % globalMod;

      const divisibilityTest = worryLevel % +getLastElement(lines[3]) === 0;

      if (divisibilityTest) {
        const sendTo = +getLastElement(lines[4]);
        items[monkeyNr].shift();
        items[sendTo].push(worryLevel);
      } else {
        const sendTo = +getLastElement(lines[5]);
        items[monkeyNr].shift();
        items[sendTo].push(worryLevel);
      }
    }
  }
}

const sort = [...inspected].sort((a, b) => b - a);

console.log(inspected, sort[0] * sort[1]);
