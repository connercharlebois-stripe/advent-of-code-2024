"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = void 0;
const sample = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const sample2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
/**
 * Given a string input, extract all the mul(X,Y), multiply them, and sum the products
 */
const process = (input, useToggles) => {
    const re = new RegExp(/mul\((\d+),(\d+)\)/g);
    const re_toggles = new RegExp(/do\(\)|don't\(\)/g);
    let match, matches = [], toggles_match, toggles = [];
    while ((match = re.exec(input)) != null) {
        // console.log(match);
        matches.push(match);
    }
    while ((toggles_match = re_toggles.exec(input)) != null) {
        // console.log(match);
        toggles.push(toggles_match);
    }
    console.log({ matches, toggles });
    let counter = 0, enabled = true, lastInstructionIndex = 0;
    if (useToggles) {
        for (const result of matches) {
            const currentInstructionIndex = result.index;
            const doSinceLast = toggles.find(t => t[0] === 'do()' && t.index > lastInstructionIndex && t.index < currentInstructionIndex);
            const dontSinceLast = toggles.find(t => t[0] === "don't()" && t.index > lastInstructionIndex && t.index < currentInstructionIndex);
            console.log({ currentInstructionIndex, lastInstructionIndex, doSinceLast, dontSinceLast });
            if (enabled) {
                if (!dontSinceLast) {
                    // if enabled, and no DONT since the last instruction
                    // count it
                    counter += (Number(result[1]) * Number(result[2]));
                }
                else {
                    // if enabled, and DONT since the last instruction
                    // don't count it
                    // flip enabled
                    enabled = false;
                }
            }
            else {
                if (doSinceLast) {
                    // if disabled, and DO since the last instruction
                    // count it
                    counter += (Number(result[1]) * Number(result[2]));
                    // flip enabled
                    enabled = true;
                }
                else {
                    // if disabled, and no DO since the last insruction
                    // don't count it
                }
            }
            lastInstructionIndex = result.index;
        }
    }
    else {
        for (const result of matches) {
            counter += (Number(result[1]) * Number(result[2]));
        }
    }
    return counter;
};
exports.process = process;
exports.default = () => {
    // console.log(process(sample, false));
    console.log((0, exports.process)(sample2, true));
};
