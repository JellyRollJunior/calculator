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

function updateWorkingDisplay(displayValue) {
    const display = document.querySelector("#working-display");
    display.textContent = displayValue;
}

function updateTopDisplay(displayValue) {
    const topDisplay = document.querySelector("#top-display");
    topDisplay.textContent = displayValue;
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
            if (
                leftOperand !== null &&
                operator != null &&
                rightOperand != null
            ) {
                let result =
                    operator !== "÷" && rightOperand !== "0"
                        ? operate(leftOperand, operator, rightOperand).toString()
                        : SNARKY_DIVIDE_BY_ZERO_MESSAGE;
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

function negateOperand(operand) {
    return operand === null
        ? null
        : operand === "0"
        ? "0"
        : operand.charAt(0) === "-"
        ? operand.slice(1)
        : `-${operand}`;
}

function negateWorkingDisplay() {
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
        clearExpressionVariables();
        updateTopDisplay("");
        updateWorkingDisplay("");
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
        if (
            leftOperand !== null &&
            operator !== null &&
            rightOperand !== null
        ) {
            displayEquation();
            let result =
                operator !== "÷" && rightOperand !== "0"
                    ? operate(leftOperand, operator, rightOperand).toString()
                    : SNARKY_DIVIDE_BY_ZERO_MESSAGE;
            updateWorkingDisplay(result);
            clearExpressionVariables();
            if (result !== SNARKY_DIVIDE_BY_ZERO_MESSAGE) {
                leftOperand = result;
            }
        }
    });
}

/* expression variables */
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