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

const outputArea = document.getElementById("output");
const answerArea = document.getElementById("answer-area");
const btns = document.querySelectorAll("button");
let currentEntry;
let operator;
let currentLog = [];
let answer;
let multiplierIndex;
let divideIndex;
let replacement;

btns.forEach((button) => {
    button.addEventListener("click", function () {
        if (this.classList.contains("number")) {
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
        } else if (this.classList.contains("operator")) {
            if (answer == null) {
                currentLog.push(parseFloat(currentEntry));
                currentEntry = null;
            } else {
                currentLog.splice(0, currentLog.length, answer);
                answer = null;
            }
            currentLog.push(this.value);
            outputArea.textContent = currentLog.join("");
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
        } else if (this.classList.contains("clear")) {
            currentEntry = null;
            currentLog = [];
            answer = null;
            outputArea.textContent = currentLog;
            answerArea.textContent = answer;
        }
    })
})