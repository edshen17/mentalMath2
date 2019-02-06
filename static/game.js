function onReady(questions) {
  setTimeout(() => { responsiveVoice.speak(`${questions[score].voice}`, "UK English Male") }, 500);

  $("#question").toggleClass("blurred");
  $('#answer').keypress(function(e) {
    if (e.keyCode == 13) $('#check-button').click();
  });
}

function onBlur() {
  $("#answer").focus();
  let isBlurred = $('#blur-button').text() === 'Unblur question'
  isBlurred ? $('#blur-button').text('Blur question') : $('#blur-button').text('Unblur question') //changes button text depending on toggleClass
  $("#question").toggleClass("blurred");
}

function checkAnswer(questions) {
  const $scoreElem = $('#score');
  const $input = $('#answer');
  const $qElem = $('#question');
  let input = parseInt(document.getElementById('answer').value);

  $("#answer").focus();
  if (input && typeof input === 'number') {
    if (input === questions[score].answer) {
      $input.val('');
      responsiveVoice.speak(`was ${questions[score].answer}`, "UK English Male");
      score++
      $scoreElem.text(score);

      if (score < questions.length) {
        let groupButton = document.getElementById('group-button');
        let isTwoDigit = questions[score].num2 < 9;
        isTwoDigit && score <= questions.length - 1 ? groupButton.style.display = 'none' : groupButton.style.display = 'block';

        $qElem.text(`${questions[score].num1} ${questions[score].op}  ${questions[score].num2}`);
        if (!responsiveVoice.isPlaying()) responsiveVoice.speak(`${questions[score].voice}`, "UK English Male");

      } else {
        $('#question').text('you win!');
        $('#answer').hide();
        $('#check-button').hide();
      }

    } else {
      $input.val('');
      responsiveVoice.speak(`${questions[score].voice}`, "UK English Male")
    }
  } else {
    alert('Please enter a valid input!');
  }
}

//groups numbers by splitting them up of multiplies of either tens, hundreds, thousands, etc.
function breakNumbers(num) {
  const nums = num.toString().split('');
  const len = nums.length;
  const answer = nums.map(function(n, i) {
    return n + (Array(len - i - 1).fill(0)).join('');
  });
  return answer.map(Number).filter(function(n) { return n !== 0; });
}

//group up and speak
function groupUp() {
  const arr = breakNumbers(questions[score].num2);
  $("#answer").focus();
  questions[score].brokenUp = `${questions[score].num1} ${questions[score].op} , ${arr.join(questions[score].op)}`;
  responsiveVoice.speak(questions[score].brokenUp, "UK English Male");
}
