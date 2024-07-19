/* Arithmetic operations */
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

/* Display functions */
function updateWorkingDisplay(displayValue) {
    const display = document.querySelector("#working-display");
    if (displayValue.length > 15) {
        let intValue = +displayValue;
        displayValue = intValue.toExponential(9).toString();
    }
    display.textContent = displayValue;
}

function updateTopDisplay(displayValue) {
    const topDisplay = document.querySelector("#top-display");
    topDisplay.textContent = displayValue;
}

function displayEquation() {
    const topDisplay = document.querySelector("#top-display");
    let equation = `${leftOperand} ${operator} ${rightOperand} =`;
    topDisplay.textContent = (equation.length > 23) ? EQUATION_TOO_LONG_MESSAGE : equation;
}

/* Modify operands / operators functions */
function updateOperand(operand, newNumber) {
    return operand === "0" || operand === null
        ? newNumber
        : operand.length >= 8
        ? operand
        : operand + newNumber;
}

function negateOperand(operand) {
    return operand === null
        ? null
        : operand === "0"
        ? "0"
        : operand.charAt(0) === "-"
        ? operand.slice(1)
        : `-${operand}`;
}

function clearExpressionVariables() {
    leftOperand = null;
    operator = null;
    rightOperand = null;
}

/* Button event listeners && logic */
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
            if (
                leftOperand !== null &&
                operator != null &&
                rightOperand != null
            ) {
                let result =
                    operator == "÷" && rightOperand == "0"
                        ? SNARKY_DIVIDE_BY_ZERO_MESSAGE
                        : operate(
                              leftOperand,
                              operator,
                              rightOperand
                          ).toString();
                updateWorkingDisplay(result);
                clearExpressionVariables();
                if (result !== SNARKY_DIVIDE_BY_ZERO_MESSAGE) {
                    leftOperand = result;
                }
            }
            if (leftOperand !== null) {
                operator = event.target.textContent;
                updateTopDisplay(`${leftOperand} ${operator}`);
            }
        });
    });
}

function negateOnClickingPlusMinusButton() {
    const negateButton = document.querySelector("#negate");
    negateButton.addEventListener("click", (event) => {
        if (leftOperand !== null && rightOperand == null) {
            leftOperand = negateOperand(leftOperand);
            // if operand is available, that means left operand is entered => update top display
            operator !== null
                ? updateTopDisplay(`${leftOperand} ${operator}`)
                : updateWorkingDisplay(leftOperand);
        } else if (rightOperand !== null) {
            rightOperand = negateOperand(rightOperand);
            updateWorkingDisplay(rightOperand);
        }
    });
}

function clearDisplayOnClickingACButton() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", (event) => {
        clearExpressionVariables();
        updateTopDisplay("");
        updateWorkingDisplay("");
    });
}

function operateOnClickingEqualButton() {
    const equalButton = document.querySelector("#equal");
    equalButton.addEventListener("click", (event) => {
        if (
            leftOperand !== null &&
            operator !== null &&
            rightOperand !== null
        ) {
            displayEquation();
            let result =
                operator == "÷" && rightOperand == "0"
                    ? SNARKY_DIVIDE_BY_ZERO_MESSAGE
                    : operate(leftOperand, operator, rightOperand).toString();
            updateWorkingDisplay(result);
            clearExpressionVariables();
            if (result !== SNARKY_DIVIDE_BY_ZERO_MESSAGE) {
                leftOperand = result;
            }
        }
    });
}

/* expression variables */
const EQUATION_TOO_LONG_MESSAGE = "Too long ๑>؂•̀๑";
const SNARKY_DIVIDE_BY_ZERO_MESSAGE = "oops ๑>؂•̀๑";
let leftOperand = null;
let operator = null;
let rightOperand = null;

/* Execution phase */
displayNumberOnClick();
displayOperandOnClick();
operateOnClickingEqualButton();
negateOnClickingPlusMinusButton();
clearDisplayOnClickingACButton();