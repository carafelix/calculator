"use strict";
// ---------- nodes // I think I can do much better with a OOP approach. Calculation could be an object like n1 op n2, result function
const numbers = document.querySelectorAll('.number button'); // infered 'as NodeListOf<HTMLButtonElement'>
const operators = document.querySelectorAll('.operator button');
const float = document.querySelector('#float');
const equal = document.querySelector('#equal');
const backspace = document.querySelector('#backspace');
const clear = document.querySelector('#clear');
const log = document.querySelector('#log');
const result = document.querySelector('#result');
const allButtons = document.querySelectorAll('button');
const pip = document.querySelector('audio');
// ---------- operatorial variables
let preOperandA = '';
let operator = '';
let preOperandB = '';
let toggle = false;
// ---------- operatorial function
function operate(a, op, b) {
    if (op === '+' && typeof a === 'number') {
        return a + b;
    }
    else if (op === '-' && typeof a === 'number') {
        return a - b;
    }
    else if (op === '/' && typeof a === 'number') {
        return a / b;
    }
    else if (op === '*' && typeof a === 'number') {
        return a * b;
    }
    else if (op === '^' && typeof a === 'number') {
        return a ** b;
    }
    else if (op === '%' && typeof a === 'number') {
        return a % b;
    }
    else {
        throw new Error('what are you doing?');
    }
}
// ----------- listener functions 
//document.addEventListener('keydown', (e)=>getOperand(e))
numbers.forEach((n) => n.addEventListener('mousedown', (e) => getOperand(e)));
operators.forEach((n) => n.addEventListener('mousedown', (e) => getOperator(e)));
equal === null || equal === void 0 ? void 0 : equal.addEventListener('mousedown', () => commandEqual());
clear === null || clear === void 0 ? void 0 : clear.addEventListener('mousedown', () => commandClearAll());
backspace === null || backspace === void 0 ? void 0 : backspace.addEventListener('mousedown', () => commandBackspace());
float === null || float === void 0 ? void 0 : float.addEventListener('mousedown', () => commandAddFloat());
allButtons.forEach((b) => b.addEventListener('mousedown', (e) => buttonColor(e)));
allButtons.forEach((b) => b.addEventListener('mouseup', (e) => buttonColor(e)));
window.addEventListener('keydown', (e) => keyboardSupport(e));
window.addEventListener('keydown', (e) => keyboardColor(e));
window.addEventListener('keyup', (e) => keyboardUnColor(e));
// add number to operand, if A as a value, add it to B
function getOperand(e) {
    console.log(e);
    if (toggle === true && operator == '') {
        preOperandA = '';
        result.innerText = '0';
        toggle = false;
    }
    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        operator === '' && preOperandB === '') {
        if (e.target.dataset.key === 'pi') {
            preOperandA = '3.141';
        }
        else {
            preOperandA += e.target.dataset.key;
        }
        updateLog();
    }
    else if ((e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key) &&
        preOperandA !== '' && operator !== '') {
        if (e.target.dataset.key === 'pi') {
            preOperandB = '3.141';
        }
        else {
            preOperandB += e.target.dataset.key;
        }
        updateLog();
    }
    else if (e instanceof KeyboardEvent &&
        e.key &&
        operator === '' && preOperandB === '') {
        preOperandA += e.key;
        updateLog();
    }
    else if (e instanceof KeyboardEvent &&
        e.key &&
        preOperandA !== '' && operator !== '') {
        preOperandB += e.key;
        updateLog();
    }
}
function getOperator(e) {
    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement &&
        e.target.dataset.key &&
        preOperandA !== '' && preOperandB === '') {
        operator = e.target.dataset.key;
    }
    else if (e instanceof KeyboardEvent &&
        e.key &&
        preOperandA !== '' && operator === '') {
        console.log(e);
        operator = e.key;
    }
    updateLog();
}
function commandEqual() {
    if (preOperandA !== '' && operator !== '' && preOperandB !== '') {
        let operandA = +(preOperandA);
        let operandB = +(preOperandB);
        updateResult(operate(operandA, operator, operandB));
        toggle = true;
    }
}
function updateResult(n) {
    log.innerText = `${preOperandA} ${operator} ${preOperandB} =`;
    preOperandA = `${n}`;
    preOperandB = '';
    operator = '';
    if (preOperandA.includes('.')) {
        result.innerText = `${n.toFixed(3)}`;
    }
    else
        result.innerText = `${n}`;
}
function updateLog() {
    log.innerText = `${preOperandA} ${operator} ${preOperandB}`;
}
function commandClearAll() {
    preOperandA = '';
    preOperandB = '';
    operator = '';
    result.innerText = '0';
    log.innerText = '';
}
function commandBackspace() {
    if (preOperandB) {
        let holdmethis = preOperandB.split('');
        holdmethis.pop();
        preOperandB = holdmethis.join('');
    }
    else if (operator) {
        let holdmethis = operator.split('');
        holdmethis.pop();
        operator = holdmethis.join('');
    }
    else if (preOperandA) {
        let holdmethis = preOperandA.split('');
        holdmethis.pop();
        preOperandA = holdmethis.join('');
    }
    else {
        let veet = pip === null || pip === void 0 ? void 0 : pip.cloneNode();
        veet.volume = 0.3;
        veet === null || veet === void 0 ? void 0 : veet.play();
    }
    updateLog();
}
function commandAddFloat() {
    if (preOperandB) {
        if (!preOperandB.includes('.')) {
            preOperandB += '.';
        }
    }
    else if (preOperandA && operator === '') {
        if (!preOperandA.includes('.')) {
            preOperandA += '.';
        }
    }
    updateLog();
}
function buttonColor(e) {
    if (e instanceof MouseEvent &&
        e.target instanceof HTMLButtonElement) {
        e.target.classList.toggle('focus');
    }
}
function keyboardSupport(e) {
    const pressNum = document.querySelector(`.num[data-key="${e.key}"]`);
    const pressOp = document.querySelector(`.op[data-key="${e.key}"]`);
    const pressFloat = document.querySelector(`.float[data-key="${e.key}"]`);
    const pressEqual = document.querySelector(`.equal[data-key="${e.key}"]`);
    const pressClear = document.querySelector(`.clear[data-key="${e.key}"]`);
    const pressBackspace = document.querySelector(`.backspace[data-key="${e.key}"]`);
    if (pressNum) {
        getOperand(e);
    }
    else if (pressOp) {
        getOperator(e);
    }
    else if (pressFloat) {
        commandAddFloat();
    }
    else if (pressEqual) {
        commandEqual();
    }
    else if (pressClear) {
        commandClearAll();
    }
    else if (pressBackspace) {
        commandBackspace();
    }
}
;
function keyboardColor(e) {
    const press = document.querySelector(`button[data-key="${e.key}"]`);
    if ((press === null || press === void 0 ? void 0 : press.dataset.key) === '/') {
        e.preventDefault();
        press.classList.add('focus');
    }
    else if (press) {
        press.classList.add('focus');
    }
}
function keyboardUnColor(e) {
    const press = document.querySelector(`button[data-key="${e.key}"]`);
    if (press) {
        press.classList.remove('focus');
    }
}
