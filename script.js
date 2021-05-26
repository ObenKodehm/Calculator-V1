const numbers = document.querySelectorAll('button[name="0"],button[name="1"],button[name="2"],button[name="3"],button[name="4"],button[name="5"],button[name="6"],button[name="7"],button[name="8"],button[name="9"]');
const operators = document.querySelectorAll('button[name="divide"],button[name="multiply"],button[name="subtract"],button[name="add"]');
const allClear = document.querySelector('button[name="AC"]');
const decimal = document.querySelector('button[name="decimal"]');
const equal = document.querySelector('button[name="equal"]');
const textInput = document.querySelector('.text-input p');
const historyInput = document.querySelector('.text-input h3');
let num1 = "0";
let num2;
let operator;
let opp;
let sol;


function add(a,b) {
    return Number(a)+Number(b);
}

function subtract(a,b) {
    return Number(a)-Number(b);
}

function multiply(a,b) {
    return Number(a)*Number(b);
}

function divide(a,b) {
    if (b === "0") {
        historyInput.textContent = "";
        return "Lol";
    }
    return Number(a)/Number(b);
}


function operate() {
    if (!(Boolean(operator) && Boolean(num1) && Boolean(num2))) {return};
    historyInput.textContent += num2;
    historyInput.textContent += "=";
    clearHistory();
    switch (true) {
        case (operator === "add" && Boolean(num1) && Boolean(num2)):
            textInput.textContent = add(num1,num2);
            num1 = (add(num1,num2)).toString();
        break;
        case (operator === "subtract" && Boolean(num1) && Boolean(num2)):
            textInput.textContent = subtract(num1,num2);
            num1 = (subtract(num1,num2)).toString();
        break;
        case (operator === "multiply" && Boolean(num1) && Boolean(num2)):
            textInput.textContent = multiply(num1,num2);
            num1 = (multiply(num1,num2)).toString();
        break;
        case (operator === "divide" && Boolean(num1) && Boolean(num2)):
            textInput.textContent = divide(num1,num2);
            num1 = (divide(num1,num2)).toString();
        break;
    }
    if (num1 === "Lol") {
        numbers.forEach(value => {
            value.removeEventListener('click',showUserInput1);
        });
        numbers.forEach(value => {
            value.removeEventListener('click',showUserInput2);
        });
        return;
    }
    if (!(textInput.textContent.indexOf(".") === -1)) {
        decimal.removeEventListener('click', addDecimal, {once: true});
    }
    numbers.forEach(value => {
        value.removeEventListener('click',showUserInput2);
    });
    numbers.forEach(value => {
        value.addEventListener('click',showUserInput1);
    });
    num2 = undefined;
    operator = undefined;
}


function showUserInput1(e) {
    historyInput.textContent = "";
    if (textInput.textContent.length === 19) {
        return;
    }
    if (textInput.textContent[0] === "0" && textInput.textContent.indexOf(".") === -1) {
        textInput.textContent = "";
    }
    textInput.textContent += e.target.getAttribute('name');
    num1 = textInput.textContent;
}

function showUserInput2(b) {
    if (textInput.textContent.indexOf(".") === -1) {
        decimal.addEventListener('click', addDecimal, {once: true});
    }
    if (textInput.textContent.length === 19) {
        return;
    }
    textInput.textContent += b.target.getAttribute('name');
    num2 = textInput.textContent;
}

function addDecimal() {
    textInput.textContent += ".";
}


function operatorChoice(a) {
    if (!(operator === undefined)) {return};
    operator = a.target.getAttribute('name');
    numbers.forEach(value => {
        value.removeEventListener('click',showUserInput1);
    });
    textInput.textContent = "";
    numbers.forEach(value => {
        value.addEventListener('click',showUserInput2);
    });
    changeOperatortoOpp();
    historyInput.textContent += num1;
    historyInput.textContent += opp;
    clearHistory();
}

function clearScreen() {
    decimal.addEventListener('click', addDecimal, {once: true});
    textInput.textContent = "0";
    historyInput.textContent = "";
    num1 = "0";
    num2 = undefined;
    operator = undefined;
    numbers.forEach(value => {
        value.removeEventListener('click',showUserInput2);
    });
    numbers.forEach(value => {
        value.addEventListener('click',showUserInput1);
    });
}


// Event Listeners

numbers.forEach(value => {
    value.addEventListener('click',showUserInput1);
});

operators.forEach(value => {
    value.addEventListener('click',operatorChoice);
});

decimal.addEventListener('click', addDecimal, {once: true});

equal.addEventListener('click', operate);
allClear.addEventListener('click', clearScreen);


// Miscellaneous Functions

function changeOperatortoOpp() {
    if (operator === "add") {
        opp = "+";
    } else if (operator === "subtract") {
        opp = "-";
    } else if (operator === "multiply") {
        opp = "*";
    } else if (operator === "divide") {
        opp = "/";
    }
}

function clearHistory() {
    if (historyInput.textContent.length >= 34) {
        historyInput.textContent = "";
    } else {
        return;
    }
}
