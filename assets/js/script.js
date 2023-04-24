$(document).ready(function () {
  let questions = [];
  let userAnswers = [];
  let correctAnswers = [];

  function displayScore() {
    let totalQuestions = questions.length;
    $("#score").text(`0/${totalQuestions}`);
  }

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (data) {
    questions = data;
    console.log(questions);

    let questionList = $("#question-list");

    for (let i = 0; i < data.length; i++) {
      let question = data[i];
      let questionItem = $(`<p class="question-item">Q${data[i].id}: ${data[i].question}</p>`);
      let optionList = $("<ul></ul>");

      for (let j = 0; j < data[i].options.length; j++) {
        let optionItem = $("<li></li>");
        let optionLabel = $("<label></label>").text(data[i].options[j]);
        let optionInput = $("<input>").attr({
          type: "radio",
          name: `question${i}`,
          value: data[i].options[j]
        });

        if (j == data[i].answer - 1) {
          correctAnswers[i] = data[i].options[j];
        }

        optionLabel.prepend(optionInput);
        optionItem.append(optionLabel);
        optionList.append(optionItem);
      }

      questionItem.append(optionList);
      questionList.append(questionItem);
    }

    displayScore();
  });

  $("#submit-btn").click(function () {
    userAnswers = [];
    for (let i = 0; i < questions.length; i++) {
      let answer = $(`input[name=question${i}]:checked`).val();
      userAnswers.push(answer);
    }
    console.log(userAnswers);
    console.log(correctAnswers);
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (correctAnswers[i] === userAnswers[i]) {
        score++;
      }
    }

    $("#score").text(`${score}/${questions.length}`);
    // scroll to the top of the page
    $("html, body").animate({ scrollTop: 0 }, "slow");

    // focus on the score card
    $("#score-card").focus();
  });

  $("#reset-btn").click(function () {
    userAnswers = [];
    $("#score").text("");
    $("input[type=radio]").prop("checked", false);
    displayScore();
  });
});