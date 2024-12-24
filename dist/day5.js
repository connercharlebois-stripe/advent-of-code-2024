"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sample = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
const parseRules = (input) => {
    const rules = [];
    const lines = input.split("\n");
    for (const l of lines) {
        if (l.indexOf("|") > -1) {
            const splitLine = l.split("|");
            rules.push({
                "page": parseInt(splitLine[0]),
                "mustComeBeforePage": parseInt(splitLine[1])
            });
        }
    }
    return rules;
};
const parseUpdates = (input) => {
    const updates = [];
    const lines = input.split("\n");
    for (const line of lines) {
        if (line.indexOf(",") > -1) {
            const splitLine = line.split(",");
            updates.push({
                pages: splitLine.map(item => parseInt(item))
            });
        }
    }
    return updates;
};
const verifyUpdate = (update, rules) => {
    const brokenRules = [];
    update.pages.forEach((p, index) => {
        const applicableRules = rules.filter(r => r.mustComeBeforePage === p);
        for (const r of applicableRules) {
            const indexOfBeforePage = update.pages.indexOf(r.page);
            if (indexOfBeforePage > -1) {
                if (indexOfBeforePage > index) {
                    brokenRules.push(r);
                    // break;
                }
            }
        }
        // if (!valid){
        //     return;
        // }
    });
    return brokenRules;
};
const getMiddlePageFromUpdate = (update) => {
    const length = update.pages.length / 2;
    return update.pages[Math.floor(length)];
};
const stupidlyFixBrokenRules = (update, brokenRules, allRules) => {
    const broken = verifyUpdate(update, allRules);
    if (broken.length === 0) {
        console.log(`${JSON.stringify(update.pages)}`, "fixed");
    }
    else {
        console.log(`${JSON.stringify(update.pages)}`, broken);
        console.log("fixing rule", broken[0]);
        // remove broken[0].page
        const wrongOrderItemIndex = update.pages.findIndex(i => i === broken[0].page);
        const wrongOrderItem = update.pages[wrongOrderItemIndex];
        const minusItem = [...update.pages.slice(0, wrongOrderItemIndex), ...update.pages.slice(wrongOrderItemIndex + 1)];
        // insert before broken[0].mustComeBeforePage
        const targetItemIndex = minusItem.indexOf(broken[0].mustComeBeforePage);
        const newPages = [...minusItem.slice(0, targetItemIndex), wrongOrderItem, ...minusItem.slice(targetItemIndex)];
        console.log({ wrongOrderItem, wrongOrderItemIndex, minusItem, newPages });
        update.pages = newPages;
        stupidlyFixBrokenRules(update, brokenRules, allRules);
    }
};
const main = () => {
    process(sample, false);
};
const process = (input, valid) => {
    let sum;
    const rules = parseRules(input);
    const updates = parseUpdates(input);
    if (valid) {
        const validUpdates = updates.filter(u => verifyUpdate(u, rules).length === 0);
        validUpdates.forEach(u => {
            console.log(`${JSON.stringify(u.pages)}`, verifyUpdate(u, rules));
            console.log(`${JSON.stringify(u.pages)}`, `Middle: ${getMiddlePageFromUpdate(u)}`);
        });
        sum = validUpdates.reduce((prev, curr) => {
            return prev + getMiddlePageFromUpdate(curr);
        }, 0);
    }
    else {
        const invalidUpdates = updates.filter(u => verifyUpdate(u, rules).length > 0);
        invalidUpdates.forEach(u => {
            console.log(`${JSON.stringify(u.pages)}`, verifyUpdate(u, rules));
            stupidlyFixBrokenRules(u, u.brokenRules, rules);
        });
        sum = invalidUpdates.reduce((prev, curr) => {
            return prev + getMiddlePageFromUpdate(curr);
        }, 0);
    }
    console.log("sum", sum);
};
exports.default = {
    main,
    process
};
