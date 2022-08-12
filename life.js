const dish = [[]];
const around = [
    [i => i - 1, j => j - 1],
    [i => i - 1, j => j],
    [i => i - 1, j => j + 1],
    [i => i, j => j - 1],
    [i => i, j => j + 1],
    [i => i + 1, j => j - 1],
    [i => i + 1, j => j ],
    [i => i + 1, j => j + 1]
];

function neighbors(x, y) {
    return around.map(([fx, fy]) => dish[fx(x)][fy(y)]).filter(w => w !== undefined);
}

function next_state(x, y) {
    const cell = dish[x][y];
    const living_neighbors = neighbors(x, y).filter(w => w === true).length;

    if (cell === false) {
        return living_neighbors === 3;
    }
    if (cell === true) {
        return living_neighbors === 2 || living_neighbors === 3;
    }
}