// ================================================== special keys
const display = document.querySelector('#display');
const ac = document.querySelector('#btnAC');
const sig = document.querySelector('#btnSig');
const percent = document.querySelector('#btnPercent');
const dot = document.querySelector('#btnDot');

// ================================================== numbers
const zero = document.querySelector('#btn0');
const one = document.querySelector('#btn1');
const two = document.querySelector('#btn2');
const three = document.querySelector('#btn3');
const four = document.querySelector('#btn4');
const five = document.querySelector('#btn5');
const six = document.querySelector('#btn6');
const seven = document.querySelector('#btn7');
const eighth = document.querySelector('#btn8');
const nine = document.querySelector('#btn9');

// ================================================== operators
const div = document.querySelector('#btnDivision');
const mul = document.querySelector('#btnMult');
const sum = document.querySelector('#btnSum');
const sub = document.querySelector('#btnMinus');
const equal = document.querySelector('#btnEqual');

// ================================================== memory management
let memory = [];
let activeOperation = false;

// ================================================== change visual state

const setSelectedOperation = (elOp) => {
  elOp.style.backgroundColor = '#ffffff';
  elOp.style.color = '#ee6c4d';
};

const setUnSelectedOperation = (elOp) => {
  elOp.style.backgroundColor = '#ee6c4d';
  elOp.style.color = '#ffffff';
};

const unselectOp = (str) => {
  switch (str) {
    case '+':
      setUnSelectedOperation(sum);
      break;
    case '-':
      setUnSelectedOperation(sub);
      break;
    case '*':
      setUnSelectedOperation(mul);
      break;
    case '/':
      setUnSelectedOperation(div);
      break;
  }
};

// ================================================== adding Event handlers
const numbers = [zero, one, two, three, four, five, six, seven, eighth, nine];

const numberHandler = (n) => {
  let newDisplay = '';

  if (activeOperation) {
    unselectOp(memory[1]);
    display.innerHTML = '0';
    activeOperation = false;
  }
  const currentDisplay = display.innerHTML;
  console.log(activeOperation);
  ac.innerHTML = 'C';
  if (currentDisplay === '0') {
    newDisplay = n;
  } else {
    newDisplay = `${currentDisplay}${n}`;
  }
  display.innerHTML = `${Number(newDisplay)}`;
};

numbers.forEach((n, i) => n.addEventListener('click', () => numberHandler(i)));

// ==================================================

ac.addEventListener('click', () => {
  ac.innerHTML = 'AC';
  display.innerHTML = '0';
  setUnSelectedOperation(sum);
  setUnSelectedOperation(sub);
  setUnSelectedOperation(mul);
  setUnSelectedOperation(div);
  memory = [];
  activeOperation = false;
  console.log(memory);
});

// ==================================================

sig.addEventListener('click', () => {
  const currentDisplay = display.innerHTML;
  let newDisplay = `${Number(currentDisplay) * -1}`;
  if (currentDisplay === '0') {
    newDisplay = '-0';
  }
  display.innerHTML = newDisplay;
});

// ==================================================

percent.addEventListener('click', () => {
  const currentDisplay = display.innerHTML;
  display.innerHTML = `${Number(currentDisplay) / 100}`;
});

// ==================================================

const decimalHandler = () => {
  const currentDisplay = display.innerHTML;
  if (currentDisplay.indexOf('.') > 0) return;
  display.innerHTML = `${currentDisplay}.`;
};

dot.addEventListener('click', () => decimalHandler());

// ==================================================

const operationHandler = (op, opEl) => {
  console.log(memory);
  if (memory.length === 0) {
    setSelectedOperation(opEl);
    memory.push(Number(display.innerHTML));
    memory.push(op);
  } else {
    if (memory[1] !== op) {
      unselectOp(memory[1]);
      setSelectedOperation(opEl);
      memory[1] = op;
    } else {
      console.log('calcular total sin btn Igual');
      const operation = `${memory.join(' ')} ${Number(display.innerHTML)}`;
      display.innerHTML = `${eval(operation)}`;
      unselectOp(op);
      memory = [];
      memory.push(eval(operation));
      memory.push(op);
      console.log(memory);
      console.log(activeOperation);
    }
  }
  activeOperation = true;
  console.log(memory);
};

sum.addEventListener('click', () => operationHandler('+', sum));
sub.addEventListener('click', () => operationHandler('-', sub));
mul.addEventListener('click', () => operationHandler('*', mul));
div.addEventListener('click', () => operationHandler('/', div));

// ==================================================

const equalHandler = () => {
  const operation = `${memory.join(' ')} ${Number(display.innerHTML)}`;
  display.innerHTML = `${eval(operation)}`;
  unselectOp(memory[1]);
  memory = [];
  activeOperation = false;
  console.log(memory);
  console.log(activeOperation);
};

equal.addEventListener('click', () => equalHandler());