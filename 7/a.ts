const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .trim()
  .split('\n');

interface FsTree {
  id: string;
  name: string;
  size: number;
  items: FsTree[] | null;
  parentName: string | null;
}

const rootId = `${Math.random()}--${Date.now()}`;

const tree: FsTree = { name: '/', size: 0, items: [], parentName: null, id: rootId };
let currentDir = rootId;

let result = 0;

function getRefById(id: string, tree: FsTree): FsTree | null {
  if (tree.id === id) {
    return tree;
  }

  if (tree.items) {
    for (const item of tree.items) {
      const ref = getRefById(id, item);
      if (ref) {
        return ref;
      }
    }
  }

  return null;
}

for (const line of processed) {
  if (line === '$ cd /') {
    continue;
  }

  if (!line.startsWith('$')) {
    const [sizeOrDir, name] = line.split(' ');

    const item: FsTree = {
      id: `${Math.random()}--${Date.now()}`,
      name,
      size: sizeOrDir === 'dir' ? 0 : parseInt(sizeOrDir, 10),
      items: sizeOrDir === 'dir' ? [] : null,
      parentName: currentDir,
    };

    let currentRef = getRefById(currentDir, tree);
    if (currentRef) {
      currentRef.size += item.size;
      currentRef.items?.push(item);
    }

    while (currentRef?.parentName) {
      currentRef = getRefById(currentRef.parentName, tree);
      currentRef && (currentRef.size += item.size);
    }
  } else {
    const [_, command, arg] = line.split(' ');
    if (command === 'cd') {
      if (arg === '..') {
        currentDir = getRefById(currentDir, tree)?.parentName ?? '';
      } else {
        currentDir =
          getRefById(currentDir, tree)?.items?.find((item) => item.name === arg)?.id ?? '';
      }
    }
  }
}

function visitEachDir(node: FsTree) {
  if (!node.items) return;

  for (const item of node.items) {
    if (item.items) {
      item.size <= 100000 && (result += item.size);
      visitEachDir(item);
    }
  }
}

visitEachDir(tree);

console.log(result);
