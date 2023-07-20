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

let operandA:number;
let operator:string;
let operandB:number;


function operate(a:number | string, op:string,  b:number) :number | void {
    
    
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

        return //make gobal object variable

    } else {
        throw new Error('what are you doing?');
    }
}