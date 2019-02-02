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
      this.op = '+'
      this.answer = this.num1 + this.num2;
      return this.op;
    } else if (this.op === 'Subtraction') {
      this.op = '-'
      this.answer = this.num1 - this.num2;
      return this.op;
    } else if (this.op === 'Multiplication') {
      this.op = "*"
      this.answer = this.num1 * this.num2;
      return this.op;
    } else {
      this.op = '÷';
      this.answer = this.num1 / this.num2;
      return this.op;
    }
  }

  //used in responsiveVoice
  get voice() {
    return `${this.num1} ${this.op} ${this.num2} is`;
  }

}

//creates a random number
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}


//checks validity and correctness of input and updates the page if correct
function checkAnswer(question, score) {
  const input = document.getElementById('#input').value;
  if (input === question.answer) {
    console.log('you got it right!');
  }
}

function test(s) {
  console.log(s);
}

module.exports.ranNums = ranNums;
module.exports = Question;
