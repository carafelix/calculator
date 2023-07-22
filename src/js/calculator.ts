// ---------- nodes // I think I can do much better with a OOP approach. Calculation could be an object like n1 op n2, result function

const numbers = document.querySelectorAll('.number button'); // infered 'as NodeListOf<HTMLButtonElement'>
const operators = document.querySelectorAll('.operator button');

const float = document.querySelector('#float');
const equal = document.querySelector('#equal');
const backspace = document.querySelector('#backspace');
const clear = document.querySelector('#clear');

const log = document.querySelector('#log');
const result = document.querySelector('#result');


// ---------- operatorial variables

let preOperandA:string = '';
let operator:string = '';
let preOperandB:string = '';

// ---------- operatorial function

function operate(a:number | string, op:string,  b:number) :number {
    
    
    if (op === '+' && typeof a === 'number' ){

        return a+b;

    } else if(op === '-' && typeof a === 'number'){

        return a-b;

    } else if (op === '/' && typeof a === 'number'){

        return a/b;

    } else if (op === '*' && typeof a === 'number'){

        return a*b;

    } else if (op === '^' && typeof a === 'number'){

        return a**b;

    } else if (op === '%' && typeof a === 'number'){

        return a%b;

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
equal!.addEventListener('click', ()=>commandEqual());


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

function commandEqual(){
    if (preOperandA !== '' && operator !== '' && preOperandB !== '') {
        let operandA = +(preOperandA);
        let operandB = +(preOperandB);
        console.log(operate(operandA,operator,operandB))
        return operate(operandA,operator,operandB).toFixed(3)
    }
}


