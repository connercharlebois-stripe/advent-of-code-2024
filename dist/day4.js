"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.main = exports.crossMasSearch = void 0;
const testCase = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`;
const test2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
var EDirection;
(function (EDirection) {
    EDirection[EDirection["N"] = 0] = "N";
    EDirection[EDirection["NE"] = 1] = "NE";
    EDirection[EDirection["E"] = 2] = "E";
    EDirection[EDirection["SE"] = 3] = "SE";
    EDirection[EDirection["S"] = 4] = "S";
    EDirection[EDirection["SW"] = 5] = "SW";
    EDirection[EDirection["W"] = 6] = "W";
    EDirection[EDirection["NW"] = 7] = "NW";
    EDirection[EDirection["any"] = 8] = "any";
})(EDirection || (EDirection = {}));
const wordSearch = (input) => {
    const data = [];
    const rows = input.split("\n");
    rows.forEach(r => {
        data.push(r.split(""));
    });
    console.log(data);
    /**
     * 1. Find each X
     * 2. Search around each X for M
     * 3. Search around each M for A
     * 4. Search around each A for S
     */
    let count_x = 0, count_xm = 0, count_xma = 0, count_xmas = 0;
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[r].length; c++) {
            if (data[r][c] === "X") {
                console.log("X", { r, c });
                const m_locs = isAdjacentToLetter(data, r, c, "M", EDirection.any);
                if (!m_locs) {
                    continue;
                }
                for (const m of m_locs) {
                    console.log("M", { m });
                    const a_loc = isAdjacentToLetter(data, m.row, m.col, "A", m.dir);
                    if (a_loc) {
                        console.log("A", { a_loc });
                        const s_loc = isAdjacentToLetter(data, a_loc[0].row, a_loc[0].col, "S", a_loc[0].dir);
                        if (s_loc) {
                            console.log("S", { s_loc });
                            count_xmas++;
                        }
                        count_xma++;
                    }
                    count_xm++;
                }
                count_x++;
            }
        }
    }
    console.log({ count_x, count_xm, count_xma, count_xmas });
};
const getCoordsInDirection = (row, col, direction) => {
    switch (direction) {
        case EDirection.N:
            return {
                row: row - 1,
                col: col
            };
        case EDirection.NE:
            return {
                row: row - 1,
                col: col + 1
            };
        case EDirection.E:
            return {
                row: row,
                col: col + 1
            };
        case EDirection.SE:
            return {
                row: row + 1,
                col: col + 1
            };
        case EDirection.S:
            return {
                row: row + 1,
                col: col
            };
        case EDirection.SW:
            return {
                row: row + 1,
                col: col - 1
            };
        case EDirection.W:
            return {
                row: row,
                col: col - 1
            };
        case EDirection.NW:
            return {
                row: row - 1,
                col: col - 1
            };
        default:
            return {
                row, col
            };
    }
};
const getDirFromDxDy = (dx, dy) => {
    if (dx === -1 && dy === -1) {
        return EDirection.NW;
    }
    else if (dx === -1 && dy === 0) {
        return EDirection.W;
    }
    else if (dx === -1 && dy === 1) {
        return EDirection.SW;
    }
    else if (dx === 0 && dy === 1) {
        return EDirection.S;
    }
    else if (dx === 1 && dy === 1) {
        return EDirection.SE;
    }
    else if (dx === 1 && dy === 0) {
        return EDirection.E;
    }
    else if (dx === 1 && dy === -1) {
        return EDirection.NE;
    }
    else if (dx === 0 && dy === -1) {
        return EDirection.N;
    }
    else {
        console.error("wut");
        return EDirection.any;
    }
};
const isAdjacentToLetter = (data, row, col, letter, direction) => {
    if (direction === EDirection.any) {
        const ret = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }
                else if (row + dy < 0 || row + dy >= data.length) {
                    // console.log("Row out of bounds");
                    continue;
                }
                else if (col + dx < 0 || col + dx >= data[row + dy].length) {
                    // console.log("Column out of bounds");
                    continue;
                }
                else {
                    if (data[row + dy][col + dx] === letter) {
                        ret.push({
                            row: row + dy,
                            col: col + dx,
                            dir: getDirFromDxDy(dx, dy)
                        });
                    }
                }
            }
        }
        return ret || null;
    }
    else {
        const coords = getCoordsInDirection(row, col, direction);
        if (coords.row < 0 || coords.row >= data.length) {
            // console.log("Row out of bounds");
            return null;
        }
        else if (coords.col < 0 || coords.col >= data[coords.row].length) {
            // console.log("Column out of bounds");
            return null;
        }
        if (data[coords.row][coords.col] === letter) {
            return [{
                    row: coords.row,
                    col: coords.col,
                    dir: direction
                }];
        }
    }
    return null;
};
const crossMasSearch = (input) => {
    const data = [];
    const rows = input.split("\n");
    rows.forEach(r => {
        data.push(r.split(""));
    });
    console.log(data);
    let counter = 0;
    let count_a = 0, count_am = 0, count_amm = 0, count_ams = 0, count_amms = 0, count_ammss = 0;
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[r].length; c++) {
            if (data[r][c] === "A") {
                let misses = 0, hits = [];
                count_a++;
                console.log("A", { c, r });
                const loc_m = isAdjacentToLetter(data, r, c, "M", EDirection.any);
                const loc_s = isAdjacentToLetter(data, r, c, "S", EDirection.any);
                if (!loc_m || !loc_s) {
                    continue;
                }
                for (const m of loc_m) {
                    console.log("M", { col: m.col, row: m.row });
                    const dx = m.col - c;
                    const dy = m.row - r;
                    // check for opposite S
                    const opp_s = loc_s.find(s => s.row === r - dy && s.col === c - dx);
                    if (opp_s) {
                        hits.push(m);
                        console.log("S", { col: opp_s.col, row: opp_s.row, dx, dy, hits });
                        count_ams++;
                    }
                    else {
                        misses++;
                    }
                    // if (hits.length >= 2) {
                    //     counter++;
                    //     break;
                    // }
                }
                if (hits.length >= 2) {
                    console.log(JSON.stringify(hits, null, 2));
                    const horizontalMatch = hits.find(h => h.dir === EDirection.E || h.dir === EDirection.W);
                    const verticalMatch = hits.find(h => h.dir === EDirection.N || h.dir === EDirection.S);
                    const downRightMatch = hits.find(h => h.dir === EDirection.NW || h.dir === EDirection.SE);
                    const upRightMatch = hits.find(h => h.dir === EDirection.NE || h.dir === EDirection.SW);
                    if (downRightMatch && upRightMatch) {
                        counter++;
                    }
                    else {
                        "removed for not X or +";
                    }
                }
            }
        }
    }
    console.log({ counter, count_a, count_am, count_ams, count_ammss });
};
exports.crossMasSearch = crossMasSearch;
const main = () => {
    // wordSearch(testCase);
    (0, exports.crossMasSearch)(test2);
};
exports.main = main;
const search = (input) => {
    wordSearch(input);
};
exports.search = search;
