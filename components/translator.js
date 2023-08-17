const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
//returned text splitted into portion of arrays to be used while translating
function splitText(text) {
    text = text.trim();
    // console.log("text: ", text);
    let splitte = text.split(/(\s+)/g);
    let secondSplit = splitte.reduce((arr, dat) => {
        let newRes;
        let data = dat.toLowerCase();
        if (data !== "mr." && data !== "mrs." && data !== "ms." && data !== "mx." && data !== "dr." && data !== "prof.") {
            let secReg = /\d+:\d+/;

            if (!secReg.test(dat)) {
                newRes = dat.split(/([.,;:?\(\)"'!])/gi);
                arr = [...arr, ...newRes];
            } else {
                let first = dat.split(/([.,;"\(\)'?!])|(:$)/)
                arr = [...arr, ...first];
                arr = arr.filter(item => item !== undefined);
            }

        } else {
            arr.push(dat);
        };
        return arr
    }, []);

    return secondSplit
}
//splitText written in British english
function splitText1(text) {
    text = text.trim();
    // console.log("text: ", text);
    let splitte = text.split(/(\s+)/g);
    let secondSplit = splitte.reduce((arr, dat) => {
        let newRes;
        let data = dat.toLowerCase();
        if (data !== "mr" && data !== "mrs" && data !== "ms" && data !== "mx" && data !== "dr" && data !== "prof") {
            let secReg = /\d+.\d+/;

            if (!secReg.test(dat)) {
                newRes = dat.split(/([.,"';\(\):?!])/gi);
                arr = [...arr, ...newRes];
            } else {
                let first = dat.split(/([:,"'();?!])|(.$)/)
                arr = [...arr, ...first];
                arr = arr.filter(item => item !== undefined);
            }

        } else {
            arr.push(dat);
        };
        return arr
    }, []);

    return secondSplit
}

class Translator {

    //Translate from British to American english
    britAm(text) {
        //beginning of analyzing words starting from bigger to smaller
        let firstSplit = splitText1(text);
        function combRec(comb, currentString) {

            if (comb == 0) {
                return currentString
            } else {
                //get consecutive words to test
                // let initialSplit = splitText(currentString);
                // console.log("the beginning of combination of ", comb, "with the string: ", currentString);
                function insideRec(i, textString) {
                    let splitted = splitText1(textString);
                    let comb1 = splitted.length;
                    let toStop = comb1 - comb + 1;
                    // console.log("we are testing from position ", i, "the string: ", textString, "stop position: ", toStop, "comb1: ", comb1, "comb: ", comb, "splitted: ", splitted);
                    if (i == toStop) {
                        return textString
                    } else {
                        let part1 = splitted.slice(0, 0 + i);
                        let part2 = splitted.slice(i, i + comb);
                        let part3 = splitted.slice(i + comb);
                        let item = part2.join("");
                        // console.log("part1: ", part1, "part2: ", part2, "part3: ", part3, "item: ", item);
                        let amOn = britishOnly[item];
                        let keys = Object.keys(americanToBritishSpelling);
                        let values = Object.values(americanToBritishSpelling);
                        let index = values.indexOf(item);
                        let spell = keys[index];
                        let key = Object.keys(americanToBritishTitles);
                        let value = Object.values(americanToBritishTitles);
                        let inde = value.indexOf(item);
                        let title = key[inde];
                        let regex = /\d+.\d+/g;
                        let fromReg = item.match(regex);
                        let newone;
                        // console.log("fromReg: ", fromReg);
                        if (fromReg) {
                            newone = fromReg[0].split(".").join(":");
                        };
                        let array = part1;
                        if (amOn) {
                            array.push(`<span class="highlight">${amOn}</span>`);
                        } else if (spell) {
                            array.push(`<span class="highlight">${spell}</span>`);

                        } else if (title) {
                            let splittedIte = title.split("");
                            splittedIte[0] = splittedIte[0].toUpperCase();
                            title = splittedIte.join("");
                            array.push(`<span class="highlight">${title}</span>`);

                        } else if (newone) {
                            if (fromReg[0] == item) {
                                // console.log("from Reg = item", true);
                                array.push(`<span class="highlight">${newone}</span>`);
                            } else {
                                array.push(item);
                            }

                        } else {
                            item === "i" ? item = "I" : item = item;
                            array.push(item);

                        };
                        // console.log("array before part3: ", array);
                        array = [...array, ...part3];
                        //  console.log("final string after inside recu. relation : ", array.join(""));
                        i++;
                        return insideRec(i, array.join(""));
                    }
                };
                let endComb = insideRec(0, currentString);
                //  console.log("end of combination of : ", comb, "elements. Current string is: ", endComb);
                comb--;
                // return endComb
                return combRec(comb, endComb);
            }
        }
        let result = combRec(firstSplit.length, text.toLowerCase());
        let split2 = splitText1(result);
        // console.log("result: ", result, "split2", split2);
        let finale = split2.reduce((arr, elt, id) => {
            // console.log("we are testing elt: ", elt);
            let bool = true;
            let i = 0
            while (bool && i < firstSplit.length) {
                // console.log("we are testing!")
                let lowIt = firstSplit[i].toLowerCase();
               if (lowIt == elt) {
                elt = firstSplit[i];
                bool = false;
             };
             i++
           };
           arr.push(elt);
           return arr
        }, []);
        let goodStr = finale.join("");
        // console.log("good string: ", finale);
        let splittedRes = goodStr.split("");
        splittedRes[0] = splittedRes[0].toUpperCase();
        // console.log("splitted result: ", splittedRes);
        let finalResult = splittedRes.join("");
        //end of analyzing words
        let translation;
        if (finalResult.toLowerCase() == text.toLowerCase()) {
            translation = "Everything looks good to me!";
        } else {
            translation = finalResult;
        }
        return { text, translation };
    }

    //Translate from American to British English
    amBrit(text) {
        text = text.trim();
        //beginning of analyzing words starting from bigger to smaller
        let firstSplit = splitText(text);
        function combRec(comb, currentString) {

            if (comb == 0) {
                return currentString
            } else {
                //get consecutive words to test
                // let initialSplit = splitText(currentString);
                // console.log("the beginning of combination of ", comb, "with the string: ", currentString);
                function insideRec(i, textString) {
                    let splitted = splitText(textString);
                    let comb1 = splitted.length;
                    let toStop = comb1 - comb + 1;
                    // console.log("we are testing from position ", i, "the string: ", textString, "stop position: ", toStop, "comb1: ", comb1, "comb: ", comb, "splitted: ", splitted);
                    if (i == toStop) {
                        return textString
                    } else {
                        let part1 = splitted.slice(0, 0 + i);
                        let part2 = splitted.slice(i, i + comb);
                        let part3 = splitted.slice(i + comb);
                        let item = part2.join("");
                        // console.log("part1: ", part1, "part2: ", part2, "part3: ", part3, "item: ", item);
                        let amOn = americanOnly[item];
                        let spell = americanToBritishSpelling[item];
                        let title = americanToBritishTitles[item];
                        let regex = /\d+:\d\d/g;
                        let fromReg = item.match(regex);
                        let newone;
                        // console.log("fromReg: ", fromReg);
                        if (fromReg) {
                            newone = fromReg[0].split(":").join(".");
                        };
                        let array = part1;
                        if (amOn) {
                            array.push(`<span class="highlight">${amOn}</span>`);
                        } else if (spell) {
                            array.push(`<span class="highlight">${spell}</span>`);

                        } else if (title) {
                            let splittedIte = title.split("");
                            splittedIte[0] = splittedIte[0].toUpperCase();
                            title = splittedIte.join("");
                            array.push(`<span class="highlight">${title}</span>`);

                        } else if (newone) {
                            if (fromReg[0] == item) {
                                // console.log("from Reg = item", true);
                                array.push(`<span class="highlight">${newone}</span>`);
                            } else {
                                array.push(item);
                            }

                        } else {
                            item === "i" ? item = "I" : item = item;
                            array.push(item);

                        };
                        // console.log("array before part3: ", array);
                        array = [...array, ...part3];
                        //  console.log("final string after inside recu. relation : ", array.join(""));
                        i++;
                        return insideRec(i, array.join(""));
                    }
                };
                let endComb = insideRec(0, currentString);
                //  console.log("end of combination of : ", comb, "elements. Current string is: ", endComb);
                comb--;
                // return endComb
                return combRec(comb, endComb);
            }
        }
        let result = combRec(firstSplit.length, text.toLowerCase());
        let split2 = splitText(result);
        // console.log("result: ", result, "firstSplit", firstSplit);
        let finale = split2.reduce((arr, elt, id) => {
            // console.log("we are testing elt: ", elt);
            let bool = true;
            let i = 0
            while (bool && i < firstSplit.length) {
                // console.log("we are testing!")
                let lowIt = firstSplit[i].toLowerCase();
               if (lowIt == elt) {
                elt = firstSplit[i];
                bool = false;
             };
             i++
           };
           arr.push(elt);
           return arr
        }, []);
        let goodStr = finale.join("");
        // console.log("good string: ", finale);
        let splittedRes = goodStr.split("");
        splittedRes[0] = splittedRes[0].toUpperCase();
        // console.log("splitted result: ", splittedRes);
        let finalResult = splittedRes.join("");
        //end of analyzing words
        let translation;
        if (finalResult.toLowerCase() == text.toLowerCase()) {
            translation = "Everything looks good to me!";
        } else {
            translation = finalResult;
        }
        return { text, translation };
    }
}

module.exports = Translator;