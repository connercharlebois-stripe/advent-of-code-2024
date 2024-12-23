"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// import fs;
// const fs = require("fs");
const fs_1 = require("fs");
const readline = __importStar(require("readline"));
// const readline = require('readline');
const reportGrader_1 = require("./day2/reportGrader");
const multiplier_1 = require("./day3/multiplier");
const path_1 = require("path");
const data = (0, fs_1.readFileSync)((0, path_1.dirname)(require.main.filename) + "/../inputs/day3.txt", {
    encoding: "utf-8"
});
const fileStream = (0, fs_1.createReadStream)((0, path_1.dirname)(require.main.filename) + "/../inputs/day2.txt");
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
async function main() {
    let passes = 0, fails = 0, total = 0;
    for await (const line of rl) {
        // if (total >= 1){
        //   break;
        // }
        total++;
        // Each line in input.txt will be successively available here as `line`.
        const res = (0, reportGrader_1.gradeOne)(line);
        const res2 = (0, reportGrader_1.gradeAllPossibilities)(line);
        console.log({ line, res, res2 });
        if (res2) {
            passes++;
        }
        else {
            fails++;
        }
    }
    console.log({ passes, fails, total });
}
// main();
// console.log(process(data, false));
console.log((0, multiplier_1.process)(data, true));
// Day3();
// let tally = 0;
// const data = fs.readFile("./day1/input.txt", (err, data) => {
//     console.log(data);
// })
// reportGrader("7 6 4 2 1")
// reportGrader("1 2 7 8 9")
// reportGrader("9 7 6 2 1")
// reportGrader("1 3 2 4 5")
// reportGrader("8 6 4 4 1")
// reportGrader("1 3 6 7 9")
