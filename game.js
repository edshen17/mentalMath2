'use strict'
//creates a random number
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}

// creates a question (refactor into a class?)
function createQuestion(op, min, max) {
  const question = {
    num1: ranNums(min, max),
    num2: ranNums(min, max),
    get operation() {
      if (op === 'Addition') {
        this.answer = this.num1 + this.num2;
        return '+';
      } else if (op === 'Subtraction') {
        this.answer = this.num1 - this.num2;
        return '-';
      } else if (op === 'Multiplication') {
        this.answer = this.num1 * this.num2;
        return '*';
      } else {
        this.answer = this.num1 / this.num2;
        return '÷';
      }
    },
    get voice() { //used in responsiveVoice
      return `${this.num1} + ${this.num2} is`;
    },
  };

  return question;
}

// checks validity and correctness of input and updates the page if correct
function checkAnswer(question) {

}

module.exports.ranNums = ranNums;
module.exports.createQuestion = createQuestion;
