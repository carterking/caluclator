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
let answer;
let multiplierIndex;
let divideIndex;
let replacement;

btns.forEach((button) => {
    button.addEventListener("click", function () {
        //handle numbers
        if (this.classList.contains("number") || this.classList.contains("period")) {
            if (currentEntry == null) {
                currentEntry = this.value;
            } else {
                currentEntry += this.value;
            }
            if (currentLog.length > 0) {
                outputArea.textContent = currentLog.join("") + currentEntry;
            } else {
                outputArea.textContent = currentEntry;
            }
            //handle operators
        } else if (this.classList.contains("operator")) {
            if (answer == null) {
                currentLog.push(parseFloat(currentEntry));
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
            if (answer == null) {
                currentLog.push(parseFloat(currentEntry));
                currentEntry = null;
            } else {
                currentLog.push(parseFloat(answer));
            }
            multiplierIndex = currentLog.indexOf("*");
            divideIndex = currentLog.indexOf("/");
            while (multiplierIndex > -1) {
                replacement = multiply(currentLog[multiplierIndex - 1], currentLog[multiplierIndex + 1]);
                currentLog.splice(multiplierIndex - 1, 3, replacement);
                multiplierIndex = currentLog.indexOf("*");
                replacement = null;
            }
            while (divideIndex > -1) {
                replacement = divide(currentLog[divideIndex - 1], currentLog[divideIndex + 1]);
                currentLog.splice(divideIndex - 1, 3, replacement);
                divideIndex = currentLog.indexOf("/");
                replacement = null;
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
        document.getElementById("current-entry").textContent = `currentEntry =${currentEntry}`;
        document.getElementById("current-log").textContent = `cuurentLog = ${currentLog}`;
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