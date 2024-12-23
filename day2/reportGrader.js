const grade = (input) => {
    try {
        // check either all increasing or all decreasing
        const first = input[0];
        const second = input[1];
        if (first === second) return false;
        const increasing = first < second;
        input.reduce((prev, curr) => {
            if (increasing && curr <= prev) {
                throw new Error("increasing stopped");
            } else if (!increasing && curr >= prev) {
                throw new Error("decreasing stopped");
            }
            if (Math.abs(curr - prev) > 3) {
                throw new Error(`greater diff than 3: [${prev} → ${curr}]`)
            }
            return curr;
        })
        console.log("safe");
        return true
        // check diffs >= 1 and <= 3
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

const gradeOne = (str) => {
    const input = str.split(" ").map(n => Number(n));
    return grade(input);
}

const gradeAllPossibilities = (str) => {
    let success = false
    const input = str.split(" ").map(n => Number(n));
    const pass = grade(input);
    // if first one is succesful, return true
    if (pass) return true;
    const possibilities = [];
    for (let i = 0; i < input.length; i++) {
        possibilities.push([...input.slice(0, i), ...input.slice(i+1)])
    }
    console.log({possibilities});
    for (const option of possibilities){
        console.log(option)
        const res = grade(option);
        if (res) {
            success = true
            break;
        }
    }
    return success

}

module.exports = {
    gradeOne, gradeAllPossibilities
};