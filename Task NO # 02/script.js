class Calculator {
    constructor() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.display = document.getElementById('display');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target;
                
                if (target.dataset.number !== undefined) {
                    this.inputDigit(target.dataset.number);
                } else if (target.dataset.operator) {
                    this.handleOperator(target.dataset.operator);
                } else if (target.dataset.action === 'clear') {
                    this.clear();
                } else if (target.dataset.action === 'delete') {
                    this.delete();
                } else if (target.dataset.action === 'equals') {
                    this.calculate();
                }
                
                this.updateDisplay();
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                this.inputDigit(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.handleOperator(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculate();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                this.clear();
            } else if (e.key === 'Backspace') {
                this.delete();
            }
            
            this.updateDisplay();
        });
    }

    inputDigit(digit) {
        if (this.waitingForSecondOperand) {
            this.displayValue = digit;
            this.waitingForSecondOperand = false;
        } else {
            if (digit === '.' && this.displayValue.includes('.')) {
                return;
            }
            this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
        }
    }

    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.displayValue);

        if (this.firstOperand === null && !isNaN(inputValue)) {
            this.firstOperand = inputValue;
        } else if (this.operator) {
            const result = this.performCalculation();
            this.displayValue = String(result);
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    }

    performCalculation() {
        const firstOperand = this.firstOperand;
        const secondOperand = parseFloat(this.displayValue);

        if (this.operator === '+') {
            return firstOperand + secondOperand;
        } else if (this.operator === '-') {
            return firstOperand - secondOperand;
        } else if (this.operator === '*') {
            return firstOperand * secondOperand;
        } else if (this.operator === '/') {
            return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        }

        return secondOperand;
    }

    calculate() {
        if (this.operator && !this.waitingForSecondOperand) {
            const result = this.performCalculation();
            this.displayValue = String(result);
            this.firstOperand = null;
            this.operator = null;
            this.waitingForSecondOperand = false;
        }
    }

    clear() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
    }

    delete() {
        if (this.displayValue.length > 1) {
            this.displayValue = this.displayValue.slice(0, -1);
        } else {
            this.displayValue = '0';
        }
    }

    updateDisplay() {
        this.display.textContent = this.displayValue;
    }
}

// Initialize calculator
const calculator = new Calculator();
