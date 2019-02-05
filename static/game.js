'use strict'

//Question class
class Question {
  constructor(op, min, max) {
    this.op = op;
    this.num1 = ranNums(min, max);
    this.num2 = ranNums(min, max);
  }

  set operation(op) {
    if (op === 'Addition') {
      this.op = '+'
      this.answer = this.num1 + this.num2;
    } else if (op === 'Subtraction') {
      this.op = '-'
      this.answer = this.num1 - this.num2;
    } else if (op === 'Multiplication') {
      this.op = "*"
      this.answer = this.num1 * this.num2;
    } else {
      this.op = '÷';
      this.answer = this.num1 / this.num2;
    }
  }
}

//creates a random number
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}

//creates an array of Questions
function createQuestions(op = 'Addition', min = 0, max = 20, amnt = 20) {
  const questionArray = []
  for (let i = 0; i < amnt; i++) {
    let question = new Question(op, min, max);
    question.operation = op;
    questionArray.push(question);
  }

  return questionArray;
}

module.exports.createQuestions = createQuestions;
