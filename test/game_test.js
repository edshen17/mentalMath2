const expect = require('chai').expect;

describe('createQuestions', () => {
  var createQuestions = require('../static/question.js').createQuestions;

  it('should create the correct amount of Addition questions using default parameters (20 items)', () => {
    expect(createQuestions()).to.be.a('Array');
    expect(createQuestions().length).to.be.equal(20);
    expect(createQuestions()[0].op).to.deep.equal('+');
  });

  it('should create the correct amount of questions with the correct operation', () => {
    const multArray = createQuestions('Multiplication', 0, 100, 50);
    expect(multArray.length).to.be.equal(50);
    expect(multArray[0].op).to.deep.equal('×');

    const addArray = createQuestions('Addition', 0, 10, 10);
    expect(addArray.length).to.be.equal(10);
    expect(addArray[8].op).to.deep.equal('+');

    const subArray = createQuestions('Subtraction', 0, 200, 25);
    expect(subArray.length).to.be.equal(25);
    expect(subArray[15].op).to.deep.equal('−');

    const divArray = createQuestions('Division', 50, 100, 30);
    expect(divArray.length).to.be.equal(30);
    expect(divArray[20].op).to.deep.equal('÷');
  });
});
