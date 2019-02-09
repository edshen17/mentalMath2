'use strict'

/**
 * onReady - runs when the DOM is loaded. Says the first question and listens for enter keypress
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
  if (input || input === 0 && questions[score].answer === 0) {
    if (input === questions[score].answer) {
      $input.val('');
      score++
      $scoreElem.text(score);

      if (score < questions.length) {
        let groupButton = document.getElementById('group-button');
        let isTwoDigit = questions[score].num2 <= 10;
        isTwoDigit && score <= questions.length - 1 ? groupButton.style.display = 'none' : groupButton.style.display = 'block';

        $qElem.text(`${questions[score].num1} ${questions[score].op}  ${questions[score].num2}`);
        setTimeout(() => { responsiveVoice.speak(`${questions[score].voice}`, "UK English Male") }, 800);

      } else {
        $('#question').text('you win!');
        $('#answer').hide();
        $('#check-button').hide();
      }

    } else {
      $input.val('');
      responsiveVoice.speak(`${questions[score].voice}`, "UK English Male")
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
  $("#answer").focus();
  questions[score].brokenUp = `${questions[score].num1} ${questions[score].op} , ${arr.join(questions[score].op)}`;
  responsiveVoice.speak(questions[score].brokenUp, "UK English Male");
}
