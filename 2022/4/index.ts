import { readFileSync } from 'fs';

const pairs = readFileSync(`${__dirname}/input`, 'utf-8')
    .split(/\n/)
    .map(p => p.split(',').map(x => x.split('-').map(Number)));

// Part 1:
const contains = ([x1, x2]: number[], [y1, y2]: number[]) => {
    return (x1 <= y1 && x2 >= y2) || (x2 <= y2 && x1 >= y1);
};

const part1 = pairs.reduce((acc, [x, y]) => {
    if (contains(x, y)) acc++;

    return acc;
}, 0);

console.log('Part 1: ', part1);


// Part 2:
const overlaps = ([x1, x2]: number[], [y1, y2]: number[]) => {
    return x1 <= y2 && y1 <= x2;
};

const part2 = pairs.reduce((acc, [x, y]) => {
    if (overlaps(x, y)) acc++;

    return acc;
}, 0);

console.log('Part 2: ', part2);


