console.log("we are ready");

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

function operate(operator, x, y) {
    if (operator === "+") {
        return add(x, y);
    } else if (operator === "-") {
        return subtract(x, y);
    } else if (operator === "*") {
        return multiply(x, y);
    } else if (operator === "/") {
        return divide(x, y);
    } else {
        return;
    }
}

console.log(operate("*", 20, 5));

const outputArea = document.getElementById("output");
const btns = document.querySelectorAll("button");
btns.forEach((button) => {
    button.addEventListener("click", function () {
        console.log(this.value);
        outputArea.textContent = this.value;
    });
});
