const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('');

const packet: string[] = [];

for (let i = 0; i < processed.length; i++) {
  const char = processed[i];

  if (!packet.includes(char)) {
    packet.push(char);
  } else {
    packet.splice(0, packet.indexOf(char) + 1);
    packet.push(char);
  }

  if (packet.length === 4) {
    console.log(i + 1);
    break;
  }
}
