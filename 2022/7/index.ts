import { readFileSync } from 'fs';

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split(/\n/);

function buildTree(output: string[]) {
    const root: any = {};
    let currPath: string[] = ['/'];
    let currDir: string = '';

    for (const line of output) {
        if (line === "$ ls") {
            continue;
        }

        if (line.startsWith("$ cd")) {
            const [, , arg] = line.split(' ');

            switch (arg) {
                case '/':
                    currPath = ['/'];
                    break;
                case '..':
                    currPath.pop();
                    break;
                default:
                    currPath.push(arg);
                    break;
            }

            currDir = currPath.join('/');

            continue;
        } 

        if (!root[currDir]) {
            root[currDir] = { files: {}, directories: {} };
        }

        if (line.startsWith('dir')) {
            const [, arg] = line.split(' ');
            const path = `${currDir}/${arg}`;

            root[currDir].directories[path] = 0;

            continue;
        } 

        const [size, file] = line.split(' ');

        root[currDir].files[file] = +size;
    }

    return root;
}
const recCalcSize = (path: string, node: any) => {
    const { directories, files } = node[path];

    let size = 0;

    Object.values<number>(files).forEach((fileSize) => (size += fileSize));
    Object.keys(directories).forEach((p) => (size += recCalcSize(p, node)));

    return size;
}

const tree = buildTree(input);

// Part 1:
const part1 = Object.keys(tree)
    .map((directory) => recCalcSize(directory, tree))
    .filter((size) => size < 100000)
    .reduce((acc, curr) => acc + curr, 0);

console.log('Part 1: ', part1);

// Part 2:
const available = 70000000 - recCalcSize('/', tree);
const missing = 30000000 - available;

const directories = Object.keys(tree)
    .map((d) => +recCalcSize(d, tree))
    .filter((size) => size >= missing);

directories.sort((a, b) => a - b);

console.log('Part 2: ', directories[0]);







