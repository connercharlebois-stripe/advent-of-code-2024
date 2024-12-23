
// Note: we use the crlfDelay option to recognize all instances of CR LF
// ('\r\n') in input.txt as a single line break.
let tally = 0;
let similarity = 0;
const firstVals = [], secondVals = [];
for await (const line of rl) {
  // Each line in input.txt will be successively available here as `line`.
  // console.log(`Line from file: ${line}`);
  const vals = line.split(/\D+/);
  firstVals.push(vals[0]);
  secondVals.push(vals[1]);
}
const sortedFirst = firstVals.sort();
const sortedSecond = secondVals.sort();
sortedFirst.forEach((i, index) => {
  tally += Math.abs(i - sortedSecond[index])
  similarity += i * sortedSecond.filter(num => num === i).length
})

console.log({tally, similarity})