'use strict'

/**
 * onReady - Says the first question and listens for "enter" keypress
 *
 * @param  {Array} questions Array of questions
 * @return {null}
 */
function onReady(questions) {
  setTimeout(() => {
    responsiveVoice.speak(`${questions[score].voice}`, "UK English Male")
  }, 500);

  $("#answer").focus();
  $("#question").toggleClass("blurred");
  $('#answer').keypress(function(e) {
    if (e.keyCode == 13) $('#check-button').click();
  });
}

/**
 * onBlur - blurs the question and changes button text depending on state
 *
 * @return {null}
 */
function onBlur() {
  $("#answer").focus();
  let isBlurred = $('#blur-button').text() === 'Unblur question'
  isBlurred ? $('#blur-button').text('Blur question') : $('#blur-button').text('Unblur question') //changes button text depending on toggleClass
  $("#question").toggleClass("blurred");
}

/**
 * onCorrect - if the user is correct, check if the next question needs a group button and speak
 *
 * @param  {type} questions description
 * @param  {type} elem      description
 * @return {type}           description
 */
function onCorrect(questions, elem) {
  let groupButton = document.getElementById('group-button');
  let isTwoDigit = questions[score].num2 <= 10;
  isTwoDigit && score <= questions.length - 1 ? groupButton.style.display = 'none' : groupButton.style.display = 'block';

  elem.text(`${questions[score].num1} ${questions[score].op}  ${questions[score].num2}`);
  setTimeout(() => { responsiveVoice.speak(`${questions[score].voice}`, "UK English Male") }, 800);
}


/**
 * onWrong - if the user is wrong, shake the input box and clear wrong answer
 *
 * @param  {type} questions description
 * @param  {type} elem      description
 * @return {type}           description
 */
function onWrong(questions, elem) {
  elem.val('');
  elem.effect('shake');
  responsiveVoice.speak(`${questions[score].voice}`, "UK English Male")
}


/**
 * checkAnswer - checks if the answer is correct and increments the score
 *
 * @param  {Array} questions Question array
 * @return {null}
 */
function checkAnswer(questions) {
  const $scoreElem = $('#score');
  const $input = $('#answer');
  const $qElem = $('#question');
  let input = parseInt(document.getElementById('answer').value);
  $("#answer").focus();

  if (input || input === 0 && questions[score].answer === 0) { // if there's an answer
    if (input === questions[score].answer) { // if the answer is correct
      $input.val('');
      score++
      $scoreElem.text(score);

      if (score < questions.length) { // and score is less than number of questions
        onCorrect(questions, $qElem);
      } else {
        $.post('/score', { score: score});
        $qElem.text('you win!');
        $input.hide();
        $('#check-button').hide();
      }

    } else { // user gets the question wrong
      onWrong(questions, $input);
    }
  }
}

/**
 * breakNumbers - groups numbers by splitting them up of multiples of either tens, hundreds, thousands, etc.
 *
 * @param  {number} num number to be broken up into smaller pieces
 * @return {number}     broken up number
 */
function breakNumbers(num) {
  const nums = num.toString().split('');
  const len = nums.length;
  const answer = nums.map(function(n, i) {
    return n + (Array(len - i - 1).fill(0)).join('');
  });
  return answer.map(Number).filter(function(n) {
    return n !== 0;
  });
}

/**
 * groupUp - group the numbers up and speak
 *
 * @return {null}
 */
function groupUp() {
  const arr = breakNumbers(questions[score].num2);
  $input.focus();
  questions[score].brokenUp = `${questions[score].num1} ${questions[score].op} , ${arr.join(questions[score].op)}`;
  responsiveVoice.speak(questions[score].brokenUp, "UK English Male");
}
