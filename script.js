const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

// Global variables
let firstValue= 0;
let operatorValue = '';
let awaiitngNextValue = false;

// Calculate first and second values depending on the operator
const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber /secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber  *secondNumber,
    '=' : (firstNumber, secondNumber) => secondNumber,
}

const sendNumberValue = (number) =>{
    // If awaiting next value set display to current number pressed
    if(awaiitngNextValue){
        calculatorDisplay.textContent = number;
        awaiitngNextValue = false;
    }
    else{
        // set display to number(s) pressed
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0'? number
            : displayValue + number
    }
}

const addDecimal = () =>{
    // Don't add decimal if operator is pressed
    if(awaiitngNextValue) return;

    // check for decimal and include on if there is none
    if (!(calculatorDisplay.textContent.includes('.'))){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

const useOperator = (operator) =>{
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaiitngNextValue) {
        operatorValue = operator;
        return;
    }

    // Set a firstvalue if there is none
    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //  Store operator
    awaiitngNextValue = true;
    operatorValue = operator}

// Reset display
const resetAll = () =>{
    calculatorDisplay.textContent = '0';
    firstValue= 0;
    operatorValue = '';
    awaiitngNextValue = false;
}

 //Event listeners
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));

    }
    else if (inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());

    }
});
// Clear all
clearBtn.addEventListener('click', resetAll)

