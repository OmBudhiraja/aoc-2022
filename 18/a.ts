const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n')
  .map((line) => line.split(',').map((s) => +s));

const droplets = new Map<string, number>();

function toKey(line: number[]) {
  return line.join(',');
}

for (let i = 0; i < processed.length; i++) {
  const line = processed[i];
  droplets.set(toKey(line), 6);
}

for (let i = 0; i < processed.length; i++) {
  const first = processed[i];
  const firstKey = toKey(first);
  const [x1, y1, z1] = first;

  for (let j = i + 1; j < processed.length; j++) {
    const second = processed[j];
    const secondKey = toKey(second);
    const [x2, y2, z2] = second;

    const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);

    if (distance === 1) {
      const firstSides = droplets.get(firstKey) ?? 0;
      const secondSides = droplets.get(secondKey) ?? 0;
      droplets.set(firstKey, firstSides - 1);
      droplets.set(secondKey, secondSides - 1);
    }
  }
}

console.log(droplets);

let result = 0;

for (const [_, value] of droplets) {
  result += value;
}

console.log(result);
