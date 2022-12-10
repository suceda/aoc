import { readFileSync } from 'fs';

const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split(/\n/)
    .map(l => l.split(' '));

const MovesMap = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
}

type Direction = 'U' | 'D' | 'L' | 'R';

const moveRope = (len: number) => {
    const visited = new Set();
    const knots = Array.from({ length: len }, () => ({ x: 0, y: 0 }));

    for (const [dir, steps] of input) {
        const d = MovesMap[dir as Direction];

        for (let s = 0; s < parseInt(steps, 10); s++) {
            knots[0].x += d.x;
			knots[0].y += d.y;

            for (let i = 1; i < knots.length; i++) {
                const h = knots[i - 1];
                const t = knots[i];

                const dx = h.x - t.x;
                const dy = h.y - t.y;

                if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                    t.x += Math.sign(dx);
                    t.y += Math.sign(dy);
                }

                visited.add(JSON.stringify(knots[len - 1]));
            }
        }
    }

    return visited.size;
};

console.log('Part 1: ', moveRope(2));
console.log('Part 2: ', moveRope(10));

