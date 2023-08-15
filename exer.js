
// let result = "1、 2、 3".split(/(\s+)/g) ;
// console.log("result: ", result)
let firstSplit = splitText(text);
function combRec(comb, currentString) {

    if (comb == 0) {
        return currentString
    } else {
        //get consecutive words to test
        let initialSplit = splitText(currentString);
        console.log("the beginning of combination of ", comb, "with the string: ", currentString);
        function insideRec(i, textString) {
            console.log("we are testing starting from the ", i, "position of the string: ", textString);
            let splitted = splitText(textString);
            let comb1 = splitted.length;
            if (i == comb1 - comb + 1) {
                return textString
            } else {
                let part1 = splitted.slice(0, 0 + i);
                let part2 = splitted.slice(i, i + comb);
                let part3 = splitted.slice(i + comb);
                // console.log("part1: ", part1, "part2: ", part2, "part3: ", part3);
                let item = part2.join("");
                item = item.toLowerCase();
                let amOn = americanOnly[item];
                let spell = americanToBritishSpelling[item];
                let title = americanToBritishTitles[item];
                let regex = /\d\d:\d\d/g;
                let fromReg = item.match(regex);
                let newone;
                // console.log("fromReg: ", fromReg);
                if (fromReg) {
                    newone = fromReg[0].split(":").join(".");
                };
                let array = part1;
                if (amOn) {
                    array.push(`<span class = "highlight">${amOn}</span>`);
                } else if (spell) {
                    array.push(`<span class = "highlight">${spell}</span>`);

                } else if (title) {
                    let splittedIte = title.split("");
                    splittedIte[0] = splittedIte[0].toUpperCase();
                    title = splittedIte.join("");
                    array.push(`<span class = "highlight">${title}</span>`);

                } else if (newone) {
                    array.push(`<span class = "highlight">${newone}</span>`);

                } else {
                    item === "i" ? item = "I" : item = item;
                    array.push(item);

                };
                array.concat(part3);
                console.log("final string after array: ", array.join(""));
                i++;
                return insideRec(i, array.join(""));
            }
        };
        
        comb--;
        let endComb = insideRec(0, currentString);
        console.log("end of combination of : ", comb, "elements. Current string is: ", endComb);
        return (comb, endComb);
    }
}
let result = combRec(firstSplit.length, text);
let splittedRes = result.split("");
splittedRes[0] = splittedRes[0].toUpperCase();
// console.log("splitted result: ", splittedRes);
let finalResult = splittedRes.join("");
