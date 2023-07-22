// ---------- nodes 

const numbers = document.querySelectorAll('.number button');
const operators = document.querySelectorAll('.operator button');
const commands = document.querySelectorAll('.command button');
const log = document.querySelector('#log');
const result = document.querySelector('#result');

// ---------- operatorial functions

function sum (a:number,b:number):number{
    return a+b
}
function substract (a:number,b:number):number{
    return a-b
}
function divide (a:number,b:number):number{
    return a/b
}
function multiply (a:number,b:number):number{
    return a*b
}
function factor (a:number,b:number):number{
    return a**b
}

function modulo (a:number,b:number):number{
    return a%b
}

// ---------- operatorial variables

let preOperandA:string = '';
let operandA:number;      

let operator:string = '';

let preOperandB:string = '';
let operandB:number;     


function operate(a:number | string, op:string,  b:number) :number {
    
    
    if (op === '+' && typeof a === 'number' ){

        return sum(a,b);

    } else if(op === '-' && typeof a === 'number'){

        return substract(a,b);

    } else if (op === '/' && typeof a === 'number'){

        return divide(a,b);

    } else if (op === '*' && typeof a === 'number'){

        return multiply(a,b);

    } else if (op === '^' && typeof a === 'number'){

        return factor(a,b);

    } else if (op === '%' && typeof a === 'number'){

        return modulo(a,b);

    } else if (op === '=' && typeof a === 'string' && typeof b === 'number'){

        return NaN // add str to object variable

    } else {
        throw new Error('what are you doing?');
    }
}

// ----------- listener functions 
//document.addEventListener('keydown', (e)=>asignOperand(e))

numbers.forEach((n) => n.addEventListener('click', (e)=>asignOperand(e) ));
operators.forEach((n) => n.addEventListener('click', (e)=>asignOperator(e) ));


// add number to operand, if A as a value, add it to B

function asignOperand(e: Event){
    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        operator === '' && preOperandB === ''){

        preOperandA += e.target.dataset.key;

    } else if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        preOperandA !== '' && operator !== ''){

            preOperandB += e.target.dataset.key;

        }
}

function asignOperator(e: Event){

    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        preOperandA !== '' && preOperandB === ''){
            
               operator = e.target.dataset.key
    }

    //update display function

}
