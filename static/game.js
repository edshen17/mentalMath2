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

// function getOperation(operation) {
//   if (op === 'Addition') {
//       return '+'
//       this.answer = this.num1 + this.num2;
//     } else if (op === 'Subtraction') {
//       this.op = '-'
//       this.answer = this.num1 - this.num2;
//     } else if (this.op === 'Multiplication') {
//       this.op = "*"
//       this.answer = this.num1 * this.num2;
//     } else {
//       this.op = '÷';
//       this.answer = this.num1 / this.num2;
//     }
// }

//creates a random number
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}

//creates an array of Questions
function createQuestions(op = 'Addition', min = 0, max = 20, amnt = 20) {
  const questionArray = []
  for (let i = 0; i < amnt; i++) {
    questionArray.push(new Question(op, min, max));
  }

  return questionArray;
}


module.exports.createQuestions = createQuestions;
