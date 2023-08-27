import historyQuestions from "./historyQuestion.js";
import scienceQuestions from "./scienceQuestions.js";
import geographyQuestions from "./geographyQuestions.js";
import technologyQuestions from "./technologyQuestions.js";
import literatureQuestions from "./literatureQuestions.js";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const questionText = document.getElementById("question-text");
const optionButtonsContainer = document.querySelector(".options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const resultSheet = document.getElementById("result-sheet");
const resultList = document.getElementById("result-list");
const restartButton = document.getElementById("restart-btn");
const questionblock = document.getElementById("question-block");
const backToHomeButtonResult = document.getElementById(
  "result-back-to-home-btn"
);

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

const loadQuestion = () => {
  console.log(selectedQuestions);
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  console.log(currentQuestion);
  questionText.textContent = currentQuestion.question;

  shuffleArray(currentQuestion.options);

  optionButtonsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.className = "option";
    optionButton.textContent = option;
    optionButton.classList.add("option-result");
    optionButton.addEventListener("click", () => handleOptionClick(index));
    optionButtonsContainer.appendChild(optionButton);
  });
  feedback.style.visibility = "hidden";
  feedback.textContent = "";
  nextButton.disabled = true;
};

const handleOptionClick = (selectedIndex) => {
  checkAnswer(selectedIndex);
};

const checkAnswer = (selectedIndex) => {
  // feedback.style.opacity = "0";
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  optionButtonsContainer.innerHTML = "";
  feedback.style.visibility = "visible";
  const resultItem = document.createElement("li");

  const questionInfo = document.createElement("span");
  questionInfo.classList.add("option-question");
  questionInfo.textContent = `${currentQuestion.question}: `;
  resultItem.appendChild(questionInfo);

  currentQuestion.options.forEach((option, optionIndex) => {
    const optionSpan = document.createElement("span");
    optionSpan.classList.add("option-result");
    optionSpan.textContent = `${option} `;

    if (selectedIndex === optionIndex) {
      if (currentQuestion.correctAnswer === option) {
        optionSpan.classList.add("green"); // Selected and correct (green)
      } else {
        optionSpan.classList.add("red"); // Selected but incorrect (red)
      }
    } else if (currentQuestion.correctAnswer === option) {
      optionSpan.classList.add("green"); // Correct option (green)
    }

    resultItem.appendChild(optionSpan);
  });

  resultList.appendChild(resultItem);
  feedback.classList.remove("option-result", "red");
  feedback.classList.remove("option-result", "green");
  if (
    currentQuestion.options[selectedIndex] === currentQuestion.correctAnswer
  ) {
    score++;
    // feedback.style.visibility = "visible";
    feedback.classList.add("option-result", "green");
    feedback.textContent = "Correct!";
  } else {
    // feedback.style.visibility = "visible";
    feedback.classList.add("option-result", "red");
    feedback.textContent = "Incorrect!";
  }
  nextButton.disabled = false;
};

const nextQuestion = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < selectedQuestions.length) {
    if (currentQuestionIndex == selectedQuestions.length - 1) {
      nextButton.textContent = "Finish";
    }
    loadQuestion();
  } else {
    // feedback.style.visibility = "visible";
    feedback.classList.remove("option-result", "red");
    feedback.classList.remove("option-result", "green");
    questionText.textContent = "Quiz completed!";
    optionButtonsContainer.innerHTML = "";
    feedback.classList.add("option-result", "blue");
    feedback.textContent = `Your score: ${score} out of ${selectedQuestions.length}`;
    nextButton.style.display = "none"; // Hide the next question button

    resultSheet.style.display = "block";
    backToHomeButtonResult.style.display = "block";
  }
};

const restartQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next Question";
  feedback.classList.remove("option-result", "blue");
  resultSheet.style.display = "none";
  nextButton.style.display = "block"; // Display the next question button
  resultList.innerHTML = ""; // Clear the result list
  loadQuestion();
};

nextButton.addEventListener("click", nextQuestion);

const startQuiz = (subjectQuestions) => {
  resultList.innerHTML = "";
  // Reset the currentQuestionIndex and score
  currentQuestionIndex = 0;
  score = 0;

  document.querySelector(".home-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  nextButton.style.display = "block";

  shuffleArray(subjectQuestions);
  selectedQuestions = subjectQuestions.slice(0, 5);
  loadQuestion();
  questionblock.style.display = "block";
};

document
  .getElementById("histo-btn")
  .addEventListener("click", () => startQuiz(historyQuestions));
document
  .getElementById("sci-btn")
  .addEventListener("click", () => startQuiz(scienceQuestions));
document
  .getElementById("geo-btn")
  .addEventListener("click", () => startQuiz(geographyQuestions));
document
  .getElementById("tech-btn")
  .addEventListener("click", () => startQuiz(technologyQuestions));
document
  .getElementById("lit-btn")
  .addEventListener("click", () => startQuiz(literatureQuestions));

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
restartButton.addEventListener("click", restartQuiz);

backToHomeButtonResult.addEventListener("click", () => {
  document.querySelector(".home-container").style.display = "block";
  document.querySelector("#question-block").style.display = "none";
  document.querySelector(".result-sheet").style.display = "none";
});
