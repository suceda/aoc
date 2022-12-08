import { readFileSync } from 'fs';

const map = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split(/\n/)
    .map(l => l.split('').map(Number));

const isTreeVisible = (row: number, col: number, grid: number[][]) => {
    const rows = grid.length;
    const cols = grid[0].length;

    // If tree is on the edge
    if (row === 0 || col === 0 || row === rows - 1 || col === cols - 1) return true;

    let up = true;
    let down = true;
    let left = true;
    let right = true;

    // check trees above
    for (let i = 0; i < row; i++) {
        if (grid[i][col] >= grid[row][col]) {
            up = false;
            break;
        }
    }

    // check trees below
    for (let i = row + 1; i < rows; i++) {
        if (grid[i][col] >= grid[row][col]) {
            down = false;
            break;
        }
    }

    // check trees on the left
    for (let i = 0; i < col; i++) {
        if (grid[row][i] >= grid[row][col]) {
            left = false;
            break;
        }
    }

    // check trees on the right
    for (let i = col + 1; i < cols; i++) {
        if (grid[row][i] >= grid[row][col]) {
            right = false;
            break;
        }
    }

    return up || down || left || right;
};

const calcScenicScore = (row: number, col: number, grid: number[][]) => {
    const rows = grid.length;
    const cols = grid[0].length;

    let up = 1;
    let down = 1;
    let left = 1;
    let right = 1;

    for (let i = row - 1; i > 0; i--) {
        if (grid[i][col] < grid[row][col]) up++;
        else break;
    }

    for (let i = col - 1; i > 0; i--) {
        if (grid[row][i] < grid[row][col]) left++;
        else break;
    }

    for (let i = col + 1; i < cols - 1; i++) {
        if (grid[row][i] < grid[row][col]) right++;
        else break;
    }

    for (let i = row + 1; i < rows - 1; i++) {
        if (grid[i][col] < grid[row][col]) down++;
        else break;
    }

    return up  * left * down * right;
}

const countVisibleTrees = (grid: number[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (isTreeVisible(r, c, grid)) {
                count++;
            }
        }
    }

    return count;
}

const calculateHighestScenicScore = (grid: number[][]) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let highest = 0;

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (isTreeVisible(r, c, grid)) {
                highest = Math.max(highest, calcScenicScore(r, c, grid))
            }
        }
    }

    return highest;
}

// PART 1: Count visible trees
const part1 = countVisibleTrees(map);

console.log('Part 1: ', part1);


// PART 2: Calculate highest scenic score
const part2 = calculateHighestScenicScore(map);

console.log('Part 2: ', part2);


