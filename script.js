let displayCalculation = document.querySelector(".display #calculation");
let displayAnswer = document.querySelector(".display #answer");

let inputStr = "", displayStr = "";

let numbers = document.querySelector(".numbers");
[...numbers.children].forEach(num => {
    num.addEventListener("click", function() {
        addToDisplay(this.id);
    })
});

let operators = document.querySelector(".operators");
[...operators.children].forEach(operator => {
    operator.addEventListener("click", function() {
        addToDisplay(this.id);
    })
});

let operators2 = document.querySelector(".operators2");
[...operators2.children].forEach(operator => {
    operator.addEventListener("click", function() {
        if (this.id == "*") {
            inputStr += "*", displayStr += "×", 
            displayCalculation.textContent += "×", displayAnswer.textContent = "";
        } else if (this.id == "/") {
            inputStr += "/", displayStr += "÷"; 
            displayCalculation.textContent += "÷", displayAnswer.textContent = "";
        } else {
            addToDisplay(this.id);
        }
    })
});

let addToDisplay = (val) => {
    inputStr += val, displayStr += val;
    displayCalculation.textContent += val, displayAnswer.textContent = "";
};

let getMathematicalValue = (fn) => new Function('return ' + fn)();

let replaceBulk = (str, toReplaceArr, replaceWithArr) => {
    let i = 0, regex = [], map = {};
    for (let i = 0; i < toReplaceArr.length; i++) {
        regex.push(toReplaceArr[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1'));
        map[toReplaceArr[i]] = replaceWithArr[i];
    }
    regex = regex.join("|");
    str = str.replace(new RegExp(regex, "g"), function(matched) {
        return map[matched];
    });
    return str;
};

let delAndAC = document.querySelector(".del-ac");
[...delAndAC.children].forEach(button => {
    button.addEventListener("click", function() {
        if (this.id == "delete") {
            inputStr = inputStr.slice(0, -1), displayStr = displayStr.slice(0, -1); 
            displayCalculation.textContent = displayStr;
        } if (this.id == "all-clear") {
            inputStr = "";
            displayCalculation.textContent = inputStr, displayAnswer.textContent = inputStr;
        }
    })
});

let squareRootResult = [], toPowerResult = [];
let resultArr= [];

let answer = document.querySelector(".answer");
[...answer.children].forEach(button => {
    button.addEventListener("click", function() {
        if (this.id == "=") {
            if (inputStr.match(/√[0-9]+/g)) {
                let toSquare = inputStr.match(/√[0-9]+/g);
                toSquare.forEach(num => squareRootResult.push(Math.sqrt(
                    num.slice(num.indexOf("√")+1))));
                inputStr = replaceBulk(inputStr, toSquare, squareRootResult);
            } if (inputStr.match(/[0-9]+\^[0-9]+/g)) {
                let toPower = inputStr.match(/[0-9]+\^[0-9]+/g);
                toPower.forEach(num => {
                    toPowerResult.push(Math.pow(num.slice(0, num.indexOf("^")), 
                    num.slice(num.indexOf("^")+1)));
                });
                inputStr = replaceBulk(inputStr, toPower, toPowerResult);
            }
            inputStr = getMathematicalValue(inputStr), resultArr.push(inputStr);
            displayCalculation.textContent = resultArr[resultArr.length - 1];
            displayAnswer.textContent = resultArr[resultArr.length - 1];
        }
    })
});