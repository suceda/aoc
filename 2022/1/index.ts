import { readFileSync } from 'fs';

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const calories = input
    .split(/\n\s*\n/)
    .map((g) => g.split(/\n/).map(Number).reduce((acc, val) => acc + val, 0));

// Part 1:
const maxCalories = Math.max(...calories);

console.log('Part 1: ', maxCalories);

// Part 2:
const threeMaxCalories = calories
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0);

console.log('Part 2: ', threeMaxCalories);