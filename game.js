'use strict'

//Question class
class Question {
  constructor(op, min, max) {
    this.op = op;
    this.num1 = ranNums(min, max);
    this.num2 = ranNums(min, max);
  }
  get operation() {
    if (this.op === 'Addition') {
      this.answer = this.num1 + this.num2;
      return '+';
    } else if (this.op === 'Subtraction') {
      this.answer = this.num1 - this.num2;
      return '-';
    } else if (this.op === 'Multiplication') {
      this.answer = this.num1 * this.num2;
      return '*';
    } else {
      this.answer = this.num1 / this.num2;
      return '÷';
    }
  }

  //used in responsiveVoice
  get voice() {
    return `${this.num1} + ${this.num2} is`;
  }

}

//creates a random number
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}


// checks validity and correctness of input and updates the page if correct
function checkAnswer(question) {

}

module.exports.ranNums = ranNums;
module.exports = Question;
