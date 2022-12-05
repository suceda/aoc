import { readFileSync } from 'fs';

const [rawStacksLines, rawInstructions] = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split(/\n\n/)
    .map(g => g.split(/\n/));

rawStacksLines.pop();

// create stacks
const stacks: string[][] = [];
const CRATE_SIZE = 3;

for (const line of rawStacksLines) {
    for (let i = 0; i < line.length; i += CRATE_SIZE + 1) {
		const start = i;
		const end = start + CRATE_SIZE;
		const crate = line.substring(start, end);

		const index = i / (CRATE_SIZE + 1);
		if (!stacks[index]) {
			stacks[index] = [];
		}
		if (crate.trim()) {
			stacks[index].unshift(crate.substring(1, 2));
		}
	}
}

// parse instructions
const instructions = rawInstructions.map(instr => {
    const [, move, from, to] = /move (\d+) from (\d+) to (\d+)/g.exec(instr) as RegExpExecArray;
    
    return {
        move: parseInt(move, 10),
        from: parseInt(from, 10) - 1,
        to: parseInt(to, 10) - 1,
    }
});

export {
    stacks,
    instructions,
}