'use strict'

//Question class
class Question {
  constructor(op, min, max) {
    this.op = op;
    this.num1 = ranNums(min, max);
    this.num2 = ranNums(min, max);
    this.voice = '';
  }


  /**
   * set operation - sets numeric operation symbol and voice string
   *
   * @param  {string} op string from the radio buttons
   * @return {null}      updates Question object
   */
  set operation(op) {
    if (op === 'Addition') {
      this.op = '+';
      this.answer = this.num1 + this.num2;
      this.voice = `${this.num1} ${this.op} ${this.num2}`;
    } else if (op === 'Subtraction') {
      this.op = '−';
      this.answer = this.num1 - this.num2;
      this.voice = `${this.num1} ${this.op} ${this.num2}`;
    } else if (op === 'Multiplication') {
      this.op = "×";
      this.answer = this.num1 * this.num2;
      this.voice = `${this.num1} ${this.op} ${this.num2}`
    } else {
      this.op = '÷';
      this.answer = this.num1 / this.num2;
      this.voice = `${this.num1} ${this.op} ${this.num2}`
    }
  }
}

/**
 * ranNums - creates a random number between n1 and n2
 *
 * @param  {number} n1 min number in range
 * @param  {number} n2 max number in range
 * @return {number}    random number between n1 and n2
 */
function ranNums(n1, n2) {
  return Math.floor(Math.random() * n2, 10 - n1 + n2);
}

/**
 * createQuestions - creates an array of Questions
 *
 * @param  {string} op = 'Addition' operation for questions
 * @param  {number} min = 0         min number in range
 * @param  {number} max = 20        max number in range
 * @param  {number} amnt = 20       amount of questions to make
 * @return {Array}                  array of Questions
 */

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
