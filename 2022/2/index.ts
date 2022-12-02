import { readFileSync } from 'fs';

const input = readFileSync(`${__dirname}/input`, 'utf-8');

const rounds = input.split(/\n/);

type ScoringPattern = typeof evaluatePart1 | typeof evaluatePart2;

const getTotalScore = (scoringPattern: ScoringPattern) => rounds.reduce((acc, val) => {
    // @ts-ignore
    return acc + scoringPattern[val]();
}, 0);

const evaluatePart1 = {
    // Draw
    'A X': () => 3 + 1,
    'B Y': () => 3 + 2,
    'C Z': () => 3 + 3,

    // Loss
    'B X': () => 0 + 1,
    'C Y': () => 0 + 2,
    'A Z': () => 0 + 3,

    // Win
    'C X': () => 6 + 1,
    'A Y': () => 6 + 2,
    'B Z': () => 6 + 3,
}

const score1 = getTotalScore(evaluatePart1);

console.log('Part 1: ', score1);

// part 2 --------

const evaluatePart2 = {
    // Draw
    'A Y': () => 3 + 1,
    'B Y': () => 3 + 2,
    'C Y': () => 3 + 3,

    // Loss
    'B X': () => 0 + 1,
    'C X': () => 0 + 2,
    'A X': () => 0 + 3,

    // Win
    'C Z': () => 6 + 1,
    'A Z': () => 6 + 2,
    'B Z': () => 6 + 3,
}

const score2 = getTotalScore(evaluatePart2);

console.log('Part 2: ', score2);