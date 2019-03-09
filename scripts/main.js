const outputArea = document.getElementById("output");
const answerArea = document.getElementById("answer-area");
const btns = document.querySelectorAll("button");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const equalBtn = document.getElementById("equals");
const periodBtn = document.getElementById("period");
let currentEntry;
let operator;
let currentLog = [];
let answer = null;
let multiplierIndex;
let divideIndex;
let replacement;
let clLen;
let multDivide;
let ez = [];

btns.forEach((button) => {
    button.addEventListener("click", function () {
        //handle numbers
        if (this.classList.contains("number") || this.classList.contains("period")) {
            clLen = currentLog.length - 1;
            if (currentEntry == null) {
                currentEntry = this.value;
                currentLog.push(parseFloat(currentEntry));
                outputArea.textContent = currentLog.join("");
            } else {
                currentEntry += this.value;
                currentLog[clLen] = parseFloat(currentEntry);
                outputArea.textContent = currentLog.join("");
            }


            //handle operators
        } else if (this.classList.contains("operator")) {
            if (answer == null) {
                currentEntry = null;
            } else {
                currentLog.splice(0, currentLog.length, answer);
                answer = null;
                answerArea.textContent = answer;
            }
            currentLog.push(this.value);
            outputArea.textContent = currentLog.join("");
            //run calculations when user clicks equals button
        } else if (this.classList.contains("equals")) {
            currentEntry = null;
            multiplierIndex = currentLog.indexOf("*");
            divideIndex = currentLog.indexOf("/");
            if (multiplierIndex > -1) {
                ez.push(multiplierIndex);
            }
            if (divideIndex > -1) {
                ez.push(divideIndex);
            }
            ez.sort(function (a, b) {
                return b - a
            });
            while (ez.length > 0) {
                multDivide = ez[ez.length - 1];
                replacement = operate(currentLog[multDivide], currentLog[multDivide - 1], currentLog[multDivide + 1]);
                currentLog.splice(multDivide - 1, 3, replacement);
                replacement = null;
                ez.pop();
                multiplierIndex = currentLog.indexOf("*");
                divideIndex = currentLog.indexOf("/");
                if (multiplierIndex > -1) {
                    ez.push(multiplierIndex);
                }
                if (divideIndex > -1) {
                    ez.push(divideIndex);
                }
                ez.sort(function (a, b) {
                    return b - a
                });
            }
            if (currentLog.length > 2) {
                while (currentLog.length > 2) {
                    replacement = operate(currentLog[1], currentLog[0], currentLog[2])
                    currentLog.splice(0, 3, replacement);
                    replacement = null;
                    answer = currentLog.join("")
                }
            } else answer = currentLog.join("");
            answerArea.textContent = answer;
            currentLog.splice(0, currentLog.length, answer);
            //clear everything when user clicks "C" button
        } else if (this.classList.contains("clear")) {
            currentEntry = null;
            currentLog = [];
            answer = null;
            outputArea.textContent = currentLog;
            answerArea.textContent = answer;
        } 
        validateButtons();
        //console.log(`answer= ${answer}`);
        //console.log(`currentLog= ${currentLog}`);
        //console.log(`currentEntry= ${currentEntry}`);
        //console.log(`ez= ${ez}`);
    })
})

function validateButtons() {
    //disable operator buttons
    if (currentEntry == null && answer == null) {
        operatorBtns.forEach((opbtn) => {
            disableBtn(opbtn);
        })
    } else operatorBtns.forEach((opbtn) => {
        enableBtn(opbtn);
    })
    //disable equal button
    if (currentLog.length > 1 && operator == null && currentEntry != null) {
        enableBtn(equalBtn);
    } else {
        disableBtn(equalBtn);
    }
    //disable number buttons
    if (answer == null) {
        numberBtns.forEach((numBtns) => {
            enableBtn(numBtns);
        })
    } else {
        numberBtns.forEach((numBtns) => {
            disableBtn(numBtns)
        })
    }
    //disable period
    if (currentEntry != null && currentEntry.indexOf(".") > -1) {
        disableBtn(periodBtn);
    } else if (answer != null) {
        disableBtn(periodBtn);
    } else {
        enableBtn(periodBtn);
    }
}

function add(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
    return parseFloat(x) - parseFloat(y);
}

function multiply(x, y) {
    return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
    return parseFloat(x) / parseFloat(y);
}

function operate(a, x, y) {
    if (a === "+") {
        return add(x, y);
    } else if (a === "-") {
        return subtract(x, y);
    } else if (a === "*") {
        return multiply(x, y);
    } else if (a === "/") {
        return divide(x, y);
    } else {
        return;
    }
}

function disableBtn(btnToDisable) {
    btnToDisable.disabled = true;
}

function enableBtn(btnToEnable) {
    btnToEnable.disabled = false;
}

validateButtons();