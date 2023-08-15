// let arr = [1, 2, 3, 4,5, 6, 7, 8, 9];
// let comb = arr.length;
// while (comb > 0) {
//     console.log("the beginning of combination of ", comb);
//     for (let i = 0; i <= arr.length - comb; i++) {
//         let part1 = arr.slice(0, 0 + i);
//         let part2 = arr.slice(i, i + comb);
//         let part3 = arr.slice(i + comb);
//         console.log("part1: ", part1, "part2: ", part2, "part3: ", part3);

//     };
//     comb--;
// }

let obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3"
}
let keys = Object.keys(obj);
let values = Object.values(obj);

console.log("keys: ", keys, "values: ", values);
console.log("index of value 1: ", values.indexOf("value3"))