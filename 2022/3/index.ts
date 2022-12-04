import { readFileSync } from 'fs';

const input = readFileSync(`${__dirname}/input`, 'utf-8');
const lines = input.split(/\n/);

// Priorities
const abc = "abcdefghijklmnopqrstuvwxyz";
const priorities = [...abc.split(""), ...abc.toUpperCase().split("")];
const getPriority = (letter: string) => priorities.indexOf(letter) + 1;


// Part 1: ---------

// Contents
const contents = lines.map((c) => {
    const mid = c.length / 2;
    return [c.slice(0, mid).split(''), c.slice(mid).split('')];
});

const getIntersection = (a: string[], b: string[]) => {
    var setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
}

const part1 = contents.reduce((acc, val) => {
    const duplicates = getIntersection(val[0], val[1]).map(getPriority);
    const sum = duplicates.reduce((acc1, val1) => acc1 + val1, 0);
    return acc + sum;
}, 0);

console.log('Part 1: ', part1);


// Part 2: ---------
const getGroups = (items: string[]) => {
    const groups: string[][][] = [];
    let currentGroup: string[][] = [];

    for (const item of items) {
      currentGroup.push(item.split(''));
  
      if (currentGroup.length === 3) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }
  
    return groups;
  }

const getThreeDuplicates = (a: string[], b: string[], c: string[]) => {
    var setB = new Set(b);
    var setC = new Set(c);
    return [...new Set(a)].filter(x => setB.has(x)).filter(x => setC.has(x));
}

const part2 = getGroups(lines)
    .map(group => getThreeDuplicates(group[0], group[1], group[2])[0])
    .map(getPriority)
    .reduce((acc, val) => acc + val, 0);

console.log('Part 2: ', part2);




