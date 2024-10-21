
const display = document.getElementById('display');

let currentValue = '';
let expression = '';

function updateDisplay() {
    display.textContent = expression || '0'; 
}

function handleNumber(number) {
    currentValue += number;
    expression += number;
    updateDisplay();
}

function handleOperator(op) {
    if (currentValue === '' && op !== '-') return; 
    if (expression === '' && op === '-') {
        currentValue = '-';  
        expression = '-';
    } else {
        expression += op;   
    }

    currentValue = '';
    updateDisplay();
}


function calculate() {
    try {
        return eval(expression).toString();  
    } catch (e) {
        return 'Error';
    }
}


function handleEquals() {
    if (expression) {
        const result = calculate();
        expression = result;
        currentValue = result;
        updateDisplay();
    }
}


function handleClear() {
    currentValue = '';
    expression = '';
    updateDisplay();
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const { textContent } = button;

        if (!isNaN(textContent)) {
            handleNumber(textContent);
        } else if (textContent === '.') {
            if (!currentValue.includes('.')) {
                currentValue += '.';
                expression += '.';
                updateDisplay();
            }
        } else if (textContent === 'C') {
            handleClear();
        } else if (textContent === '=') {
            handleEquals();
        } else {
            handleOperator(textContent);
        }
    });
});
