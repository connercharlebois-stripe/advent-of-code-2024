// import fs;
// const fs = require("fs");
import {createReadStream} from "fs";
import * as readline from 'readline';

// const readline = require('readline');
import {gradeOne, gradeAllPossibilities}  from "./day2/reportGrader";
import { dirname } from "path";

const fileStream  = createReadStream(dirname(require.main!.filename)+"/../inputs/day2.txt");
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
    const res = gradeOne(line);
    const res2 = gradeAllPossibilities(line);
    console.log({line, res, res2})
    if (res2){
      passes++;
    } else {
      fails++;
    }

  }

  console.log({passes, fails, total})
}
main();

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