class Calculator {
  constructor() {
    this.mode = 'standard';
    this.clearAll();
  }

  clearAll() {
    this.tokens = [];
    this.currentNumber = '';
    this.error = null;
    this.justEvaluated = false;
  }

  clearEntry() {
    this.currentNumber = '';
    this.error = null;
  }

  deleteLastDigit() {
    if (this.currentNumber.length > 0) {
      this.currentNumber = this.currentNumber.slice(0, -1);
    }
    this.error = null;
  }

  digit(value) {
    if (this.justEvaluated) {
      this.clearAll();
    }
    this.currentNumber += value;
    this.error = null;
  }

  decimal() {
    if (this.justEvaluated) {
      this.clearAll();
    }
    if (this.currentNumber.includes('.')) return;
    this.currentNumber += this.currentNumber === '' ? '0.' : '.';
    this.error = null;
  }

  operator(op) {
    this.error = null;

    if (this.justEvaluated && this.currentNumber) {
      this.justEvaluated = false;
      this.tokens = [this.currentNumber];
      this.currentNumber = '';
      this.tokens.push(op);
      return;
    }

    if (this.currentNumber === '') {
      if (op === '-' && (this.tokens.length === 0 || this.tokens[this.tokens.length - 1] !== '-')) {
        this.currentNumber = '-';
        return;
      }
      if (this.tokens.length > 0 && '+-*/'.includes(this.tokens[this.tokens.length - 1])) {
        this.tokens[this.tokens.length - 1] = op;
      }
      return;
    }

    this.tokens.push(this.currentNumber);
    this.currentNumber = '';
    this.tokens.push(op);
  }

  equals() {
    this.error = null;
    this.justEvaluated = false;

    if (this.currentNumber !== '') {
      this.tokens.push(this.currentNumber);
      this.currentNumber = '';
    }

    if (this.tokens.length === 0) return;

    const lastToken = this.tokens[this.tokens.length - 1];
    if ('+-*/'.includes(lastToken)) {
      this.error = 'Error: operación incompleta';
      return;
    }

    if (this.mode === 'standard') {
      this._evaluateStandard();
    } else if (this.mode === 'decimal_binary') {
      this._decimalToBinary();
    } else if (this.mode === 'binary_decimal') {
      this._binaryToDecimal();
    } else if (this.mode === 'scientific') {
      this.error = 'Científica: no implementado';
    }
  }

  _evaluateStandard() {
    if (this.tokens.length === 1) {
      this.currentNumber = this.tokens[0];
      this.tokens = [this.currentNumber];
      this.justEvaluated = true;
      return;
    }

    let result = parseFloat(this.tokens[0]);
    if (isNaN(result)) {
      this.error = 'Error: primer operando inválido';
      return;
    }

    for (let i = 1; i < this.tokens.length; i += 2) {
      const op = this.tokens[i];
      const next = parseFloat(this.tokens[i + 1]);

      if (isNaN(next)) {
        this.error = 'Error: operación incompleta';
        return;
      }

      switch (op) {
        case '+': result += next; break;
        case '-': result -= next; break;
        case '*': result *= next; break;
        case '/':
          if (next === 0) {
            this.error = 'Error: división por cero';
            return;
          }
          result /= next;
          break;
      }
    }

    result = parseFloat(result.toPrecision(12));

    this.currentNumber = String(result);
    this.tokens = [this.currentNumber];
    this.justEvaluated = true;
  }

  _decimalToBinary() {
    if (this.tokens.length > 1) {
      this.error = 'Error: solo un número a la vez en este modo';
      return;
    }
    if (this.tokens[0].includes('.')) {
      this.error = 'Error: ingrese un número entero';
      return;
    }
    const value = parseInt(this.tokens[0], 10);
    if (isNaN(value)) {
      this.error = 'Error: número decimal inválido';
      return;
    }
    const result = value.toString(2);
    this.currentNumber = result;
    this.tokens = [result];
    this.justEvaluated = true;
  }

  _binaryToDecimal() {
    if (this.tokens.length > 1) {
      this.error = 'Error: solo un número a la vez en este modo';
      return;
    }
    if (!/^[01]+$/.test(this.tokens[0])) {
      this.error = 'Error: solo dígitos 0 y 1';
      return;
    }
    const value = parseInt(this.tokens[0], 2);
    this.currentNumber = String(value);
    this.tokens = [String(value)];
    this.justEvaluated = true;
  }

  get operation() {
    if (this.justEvaluated && !this.error) {
      return this.currentNumber;
    }
    const parts = [...this.tokens];
    if (this.currentNumber !== '') {
      parts.push(this.currentNumber);
    }
    return parts.join(' ');
  }

  get result() {
    if (this.error) return this.error;
    if (this.justEvaluated) return this.currentNumber;
    return this.currentNumber;
  }

  setMode(mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.clearAll();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const calc = new Calculator();
  const operationEl = document.getElementById('operation');
  const resultEl = document.getElementById('result');
  const typeEl = document.getElementById('type');
  const buttonsEl = document.querySelector('.buttons');
  const themeBtn = document.querySelector('.circle');

  function updateDisplay() {
    operationEl.value = calc.operation;
    resultEl.value = calc.result;
  }

  buttonsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'digit': calc.digit(value); break;
      case 'decimal': calc.decimal(); break;
      case 'operator': calc.operator(value); break;
      case 'equals': calc.equals(); break;
      case 'clear': calc.clearEntry(); break;
      case 'clearAll': calc.clearAll(); break;
      case 'delete': calc.deleteLastDigit(); break;
    }

    updateDisplay();
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    let handled = true;

    if (e.key >= '0' && e.key <= '9') {
      calc.digit(e.key);
    } else if (e.key === '.') {
      calc.decimal();
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calc.equals();
    } else if (e.key === 'Backspace') {
      calc.deleteLastDigit();
    } else if (e.key === 'Escape') {
      calc.clearAll();
    } else if (e.key === 'Delete') {
      calc.clearEntry();
    } else if ('+-*/'.includes(e.key)) {
      e.preventDefault();
      calc.operator(e.key);
    } else {
      handled = false;
    }

    if (handled) {
      e.preventDefault();
      updateDisplay();
    }
  });

  typeEl.addEventListener('change', () => {
    calc.setMode(typeEl.value);
    updateDisplay();
  });

  const THEME_KEY = 'calculator-theme';

  function applyTheme(isDark) {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme !== 'light');

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
  });

  updateDisplay();
});
