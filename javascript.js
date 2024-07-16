function add(leftOperand, rightOperand) {
    return Number(leftOperand) + Number(rightOperand);
}

function subtract(leftOperand, rightOperand) {
    return Number(leftOperand) - Number(rightOperand);
}

function multiply(leftOperand, rightOperand) {
    return Number(leftOperand) * Number(rightOperand);
}

function divide(leftOperand, rightOperand) {
    return Number(leftOperand) / Number(rightOperand);
}

function operate(leftOperand, operator, rightOperand) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(leftOperand, rightOperand);
            break;
        case "-":
            result = subtract(leftOperand, rightOperand);
            break;
        case "x":
            result = multiply(leftOperand, rightOperand);
            break;
        case "÷":
            result = divide(leftOperand, rightOperand);
            break;
        default:
            result = add(leftOperand, rightOperand);
    }
    return result;
}

function updateWorkingDisplay(input) {
    const display = document.querySelector("#working-display");
    display.textContent = display.textContent + input;
}

function displayNumber() {
    const numberButtons = document.querySelectorAll("button.number");
    numberButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            updateWorkingDisplay(target.textContent);
        });
    });
}

function updateLeftExpressionDisplay(input) {
    const leftExpressionDisplay = document.querySelector(
        "#left-expression-display"
    );
    const display = document.querySelector("#working-display");
    leftExpressionDisplay.textContent = `${display.textContent} ${input}`;
}

function displayOperand() {
    const operandButtons = document.querySelectorAll(".operand");
    operandButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            updateLeftExpressionDisplay(target.textContent);
        });
    });
}

let leftOperand;
let rightOperand;
let operator;

/* Execution phase */
displayNumber();
displayOperand();
