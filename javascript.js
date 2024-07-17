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

function appendToWorkingDisplay(input) {
    const display = document.querySelector("#working-display");
    display.textContent =
        display.textContent === "0" ? input : display.textContent + input;
}

function displayNumber() {
    const numberButtons = document.querySelectorAll("button.number");
    numberButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            appendToWorkingDisplay(target.textContent);
        });
    });
}

function updateTopDisplay(input) {
    const topDisplay = document.querySelector("#top-display");
    const display = document.querySelector("#working-display");
    topDisplay.textContent = `${display.textContent} ${input}`;
}

function clearTopDisplay() {
    const display = document.querySelector("#top-display");
    display.textContent = "";
}

function clearWorkingDisplay() {
    const display = document.querySelector("#working-display");
    display.textContent = "";
}

function displayOperand() {
    const operandButtons = document.querySelectorAll(".operand");
    operandButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            updateTopDisplay(target.textContent);
            clearWorkingDisplay();
        });
    });
}

function getLeftOperand() {
    return document.querySelector("#top-display").textContent.slice(0, -2);
}

function getOperator() {
    return document.querySelector("#top-display").textContent.slice(-1);
}

function getRightOperand() {
    return document.querySelector("#working-display").textContent;
}

function operateOnEqualClick() {
    const equalButton = document.querySelector("#equal");
    equalButton.addEventListener("click", (event) => {
        let result = operate(
            getLeftOperand(),
            getOperator(),
            getRightOperand()
        );
        clearWorkingDisplay();
        appendToWorkingDisplay(result);
        clearTopDisplay();
    });
}

/* Execution phase */
displayNumber();
displayOperand();
operateOnEqualClick();
