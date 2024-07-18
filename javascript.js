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
            result =
                +rightOperand === 0
                    ? "oops ๑>؂•̀๑"
                    : divide(leftOperand, rightOperand);
            break;
        default:
            result = add(leftOperand, rightOperand);
    }
    return result;
}

function updateWorkingDisplay(displayValue) {
    const display = document.querySelector("#working-display");
    display.textContent = displayValue;
}

function updateTopDisplay() {
    const topDisplay = document.querySelector("#top-display");
    topDisplay.textContent = `${leftOperand} ${operator}`;
}

function updateOperand(operand, newNumber) {
    return operand === "0" || operand === null
        ? newNumber
        : operand + newNumber;
}

function displayNumberOnClick() {
    const numberButtons = document.querySelectorAll("button.number");
    numberButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let key = event.target.textContent;
            let displayValue = "";
            // if operator is null, we have not yet confirmed a left operand
            if (operator === null) {
                leftOperand = updateOperand(leftOperand, key);
                displayValue = leftOperand;
            } else {
                rightOperand = updateOperand(rightOperand, key);
                displayValue = rightOperand;
            }
            updateWorkingDisplay(displayValue);
        });
    });
}

function displayOperandOnClick() {
    const operandButtons = document.querySelectorAll(".operand");
    operandButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            operator = event.target.textContent;
            updateTopDisplay();
        });
    });
}

function negateWorkingDisplay() {
    const display = document.querySelector("#working-display");
    let number = display.textContent;
    if (number === "0") return;
    number = number.charAt(0) === "-" ? number.slice(1) : `-${number}`;
    display.textContent = number;
}

function negateOnClickingPlusMinusButton() {
    const negateButton = document.querySelector("#negate");
    negateButton.addEventListener("click", (event) => {
        negateWorkingDisplay();
    });
}

function clearDisplayOnClickingACButton() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", (event) => {
        clearWorkingDisplay();
        clearTopDisplay();
    });
}

function clearExpressionVariables() {
    leftOperand = null;
    operator = null;
    rightOperand = null;
}

function displayEquation() {
    const topDisplay = document.querySelector("#top-display");
    topDisplay.textContent = `${leftOperand} ${operator} ${rightOperand} =`;
}

function operateOnClickingEqualButton() {
    const equalButton = document.querySelector("#equal");
    equalButton.addEventListener("click", (event) => {
        if (leftOperand !== null 
            && operator !== null
            && rightOperand !== null
        ) {
            let result = operate(leftOperand, operator, rightOperand);
            displayEquation();
            clearExpressionVariables();
            updateWorkingDisplay(result);
            leftOperand = result;
        }
    });
}

/* expression variables */
let leftOperand = null;
let operator = null;
let rightOperand = null;

/* Execution phase */
displayNumberOnClick();
displayOperandOnClick();
operateOnClickingEqualButton();
negateOnClickingPlusMinusButton();
clearDisplayOnClickingACButton();
