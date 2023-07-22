// ---------- nodes // I think I can do much better with a OOP approach. Calculation could be an object like n1 op n2, result function

const numbers = document.querySelectorAll('.number button'); // infered 'as NodeListOf<HTMLButtonElement'>
const operators = document.querySelectorAll('.operator button');

const float = document.querySelector('#float');
const equal = document.querySelector('#equal');
const backspace = document.querySelector('#backspace');
const clear = document.querySelector('#clear');

const log = document.querySelector('#log') as HTMLDivElement;
const result = document.querySelector('#result') as HTMLDivElement;


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
//document.addEventListener('keydown', (e)=>getOperand(e))

numbers.forEach((n) => n.addEventListener('click', (e)=>getOperand(e) ));
operators.forEach((n) => n.addEventListener('click', (e)=>getOperator(e) ));
equal!.addEventListener('click', ()=>commandEqual());
clear!.addEventListener('click', ()=>clearAll());
float!.addEventListener('click', ()=>addFloat())


// add number to operand, if A as a value, add it to B

function getOperand(e: Event){
    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        operator === '' && preOperandB === ''){

            if(e.target.dataset.key === 'pi'){
                preOperandA = '3.141592654'
            } else{
                preOperandA += e.target.dataset.key;
            }
        updateLog(preOperandA,operator,preOperandB)    

    } else if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        preOperandA !== '' && operator !== ''){

            if(e.target.dataset.key === 'pi'){
                preOperandB = '3.141592654'
            } else{
                preOperandB += e.target.dataset.key;
            }
        updateLog(preOperandA,operator,preOperandB)
        }
}

function getOperator(e: Event){

    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        preOperandA !== '' && preOperandB === ''){
            
               operator = e.target.dataset.key
    }

    updateLog(preOperandA,operator,preOperandB)

}

function commandEqual(){
    if (preOperandA !== '' && operator !== '' && preOperandB !== '') {
        
        let operandA = +(preOperandA);
        let operandB = +(preOperandB);


        updateResult(operate(operandA,operator,operandB));
        

    }
}

function updateResult(n:number){

    result.innerText = n.toLocaleString('en');    
    preOperandA = `${n}`
    preOperandB = '';
    operator = '';

}

function updateLog(a:string,op:string,b:string){
        let an = +(a)
        let bn = +(b)
        result.innerText = `${a} ${operator} ${b}`
}

function clearAll(){
    preOperandA = '';
    preOperandB = '';
    operator = '';
    result.innerText = '0';
    log.innerText = '';
}

function addFloat(){

}

