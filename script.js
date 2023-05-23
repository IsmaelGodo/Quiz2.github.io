//Fetch API//
function fetchQuestions() {
  const apiUrl = "https://opentdb.com/api.php?amount=10";

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const multipleChoiceQuestions = data.results.filter(
        (question) => question.type === "multiple"
      );
      return multipleChoiceQuestions;
    });
}

//Questions1 & Options//
function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.innerHTML = question.question;
  optionsElement.innerHTML = "";
  const allOptions = shuffleOptions([
    ...question.incorrect_answers,
    question.correct_answers,
  ]);
}

allOptions.forEach((option) => {
  const optionElement = document.createElement("button");
  optionElement.innerText = option;
  optionElement.addEventListener("click", () =>
    checkAnswer(option, question.correct_answers)
  );
  optionElement.appendChild(optionElement);
});
//check si las respuestas son correctas//
function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    console.log("correct");
  } else {
    console.log("incorrect");
  }
}

//mezclar las preguntas//

function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

//muestra login page//
