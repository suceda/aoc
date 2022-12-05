import { instructions, stacks } from './input';

const getTopCrates = (s: string[][]) => s.reduce((acc, curr) => {
    return acc + curr[curr.length - 1];
}, '');

// Part 1:
const stacks1 = JSON.parse(JSON.stringify(stacks));
for (const instr of instructions) {
    for (let i = 0; i < instr.move; i++) {
        const crate = stacks1[instr.from].pop() as string;
        stacks1[instr.to].push(crate);
    }
}
console.log('Part 1: ', getTopCrates(stacks1));


// Part 2:
const stacks2 = JSON.parse(JSON.stringify(stacks));
for (const { move, from, to } of instructions) {
    const crates = stacks2[from].splice(-1 * move, move);
    stacks2[to].push(...crates);
}
console.log('Part 2: ', getTopCrates(stacks2));