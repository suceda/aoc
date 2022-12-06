import { readFileSync } from 'fs';

const datastream = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .trim()
    .split('');


const getMarker = (data: string[], len: number) => {
    let marker = -1;
    for (let i = 0; i < data.length; i += 1) {
        const start = i;
        const end = i + len;

        const set = new Set();
        data.slice(start, end).map(d => set.add(d));

        if (set.size === len) {
            marker = end;
            break;
        }
    }

    return marker;
}


// Part 1:
console.log('Part 1: ', getMarker(datastream, 4));

// Part 2:
console.log('Part 2: ', getMarker(datastream, 14));


