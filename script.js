//Quiz data//
const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

let correctAnswer = "",
  correctScore = (askedCount = 0),
  totalQuestion = 10;

// Load questions from API (cargar las preguntas)//
async function loadQuestion() {
  if (firebase.auth().currentUser) {
    const APIUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
    const result = await fetch(APIUrl);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
  }
}

// Event listeners//
function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  _playAgainBtn.addEventListener("click", restartQuiz);
  document.getElementById("logoutBtn").addEventListener("click", logout);
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
  eventListeners();
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
});

// Display questions and answers (mostrar preguntas y respuestas)//
function showQuestion(data) {
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswer.length + 1)),
    0,
    correctAnswer
  );

  _question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
  _options.innerHTML = `
    ${optionsList
      .map(
        (option, index) => `
        <li> ${index + 1}. <span>${option}</span> </li>
      `
      )
      .join("")}
  `;
  selectOption();
}

// Option selection (selecionar opciones)//
function selectOption() {
  _options.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function () {
      if (_options.querySelector(".selected")) {
        const activeOption = _options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });

    option.addEventListener("mouseover", function () {
      option.classList.add("hover");
    });

    option.addEventListener("mouseout", function () {
      option.classList.remove("hover");
    });
  });
}

// Answer checking (comprobación de respuesta)//
function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p><i class="fas fa-check"></i>Correct Answer!</p>`;
    } else {
      _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option!</p>`;
    _checkBtn.disabled = false;
  }
}

// Converting to normal text of correct answers if there are any//
function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

// Check count//
function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == totalQuestion) {
    setTimeout(function () {
      console.log("");
    }, 5000);

    _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
    _playAgainBtn.style.display = "block";
    _checkBtn.style.display = "none";
  } else {
    setTimeout(function () {
      loadQuestion();
    }, 300);
  }
}

// Set count//
function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

// Restart quiz//
function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZPVlxm2xL4D5N5pWI7mqdJS8R-QjFNg0",

  authDomain: "quiz2-256f4.firebaseapp.com",

  projectId: "quiz2-256f4",

  storageBucket: "quiz2-256f4.appspot.com",

  messagingSenderId: "112938994150",

  appId: "1:112938994150:web:bc1af02037c4e71c982e27",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

document
  .getElementById("googleLoginBtn")
  .addEventListener("click", loginWithGoogle);
document
  .getElementById("emailLoginForm")
  .addEventListener("submit", loginWithEmail);
document
  .getElementById("registrationForm")
  .addEventListener("submit", registerUser);
document.getElementById("logoutBtn").addEventListener("click", logout);

function loginWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Handle successful login
      const user = result.user;
      console.log("Logged in user:", user);
    })
    .catch((error) => {
      // Handle error
      console.log("Login error:", error);
    });
}

function loginWithEmail(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful login
      const user = userCredential.user;
      console.log("Logged in user:", user);
    })
    .catch((error) => {
      // Handle error
      console.log("Login error:", error);
    });
}

function registerUser(e) {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Handle successful registration and login
      const user = userCredential.user;
      console.log("Registered and logged in user:", user);
    })
    .catch((error) => {
      // Handle error
      console.log("Registration error:", error);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Handle successful logout
      console.log("User logged out");
    })
    .catch((error) => {
      // Handle error
      console.log("Logout error:", error);
    });
}
