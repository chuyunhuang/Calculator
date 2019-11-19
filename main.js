class Calculator {
  constructor(prevOperandTextElement, currOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currOperandTextElement = currOperandTextElement;
    this.clear();
  }
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        break
    }
    this.currentOperand = computation
    this.operation = ''
    this.previousOperand = ''

  }

  // helper function to format the number to include periods
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const intergerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let intergerDisplay
    if (isNaN(intergerDigits)) {
      intergerDisplay = ''
    } else {
      intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${intergerDisplay}. ${decimalDigits}`
    } else {
      return intergerDisplay
    }
  }

  updateDisplay() {
    this.currOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation !== null) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }
  }
}





const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const currOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('clicking', button)
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})