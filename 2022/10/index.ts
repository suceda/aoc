import { readFileSync } from 'fs';

const instructions = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split(/\n/)
    .map(l => l.split(' '));

const solvePart1 = (input: string[][]) => {
    let X = 1;
    let cycles = 1;
    let calc = 0;

    const calcStrengthAndIncCycles = () => {
        cycles++;
        
        if ((cycles - 20) % 40 === 0 && cycles <= 220) {
            calc += X * cycles;
        }
    };

    for (const [instr, value] of input) {
        calcStrengthAndIncCycles();

        if (instr === 'noop') continue;
    
        X += parseInt(value, 10);
    
        calcStrengthAndIncCycles();
    }
    
    return calc;
}

const solvePart2 = (input: string[][]) => {
    let X = 1;
    let cycles = 1;
    let output = '';

    const calcStrengthAndIncCycles = () => {
        if ((cycles) % 40 === 0 && cycles <= 220) {
            output += '\n';
        }

        if (X - 1 === cycles % 40 || X === cycles % 40 || X + 1 === cycles % 40) output += '#';
        else output += '.';
        
        cycles++;
    };

    for (const [instr, value] of input) {
        calcStrengthAndIncCycles();

        if (instr === 'noop') continue;
    
        X += parseInt(value, 10);
    
        calcStrengthAndIncCycles();
    }
    
    return output;
}

console.log('Part 1: ', solvePart1(instructions));
console.log('Part 2: \n', solvePart2(instructions));