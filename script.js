const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
      correctAnswer: "Blue Whale",
    },
    {
        question: "Who won the World Cup in 2022?",
        options: ["Brazil", "Germany", "Argentina", "Portugal"],
        correctAnswer: "Argentina",
      },
      {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
        correctAnswer: "Blue Whale",
      },
  ];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(questions);
  
  const questionText = document.getElementById("question-text");
  const optionButtonsContainer = document.querySelector(".options"); // Container for option buttons
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById("next-btn");
  const resultSheet = document.getElementById("result-sheet");
  const resultList = document.getElementById("result-list");
  const restartButton = document.getElementById("restart-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
  
    optionButtonsContainer.innerHTML = ""; // Clear previous option buttons
  
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.className = "option";
      optionButton.textContent = option;
      optionButton.addEventListener("click", handleOptionClick); // Add event listener to handle option click
      optionButtonsContainer.appendChild(optionButton);
    });
  
    feedback.textContent = "";
    nextButton.disabled = true;
  }
  
  function handleOptionClick(event) {
    const selectedOption = event.target;
    const selectedIndex = Array.from(optionButtonsContainer.children).indexOf(selectedOption);
    checkAnswer(selectedIndex);
  }
  
  function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    optionButtonsContainer.innerHTML = ""; // Clear option buttons
  
    const questionNumber = currentQuestionIndex + 1;
    const resultItem = document.createElement("li");
  
    const questionInfo = document.createElement("span");
    questionInfo.textContent = `Question ${questionNumber}: `;
    resultItem.appendChild(questionInfo);
  
    currentQuestion.options.forEach((option, optionIndex) => {
      const optionSpan = document.createElement("span");
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
  
    if (currentQuestion.options[selectedIndex] === currentQuestion.correctAnswer) {
      score++;
      feedback.textContent = "Correct!";
    } else {
      feedback.textContent = "Incorrect!";
    }
    nextButton.disabled = false;
  }
  
  
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      questionText.textContent = "Quiz completed!";
      optionButtonsContainer.innerHTML = "";
      feedback.textContent = `Your score: ${score} out of ${questions.length}`;
      nextButton.style.display = "none";
      resultSheet.style.display = "block";
    }
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultSheet.style.display = "none";
    nextButton.style.display = "block";
    resultList.innerHTML = "";
    loadQuestion();
  }
  
  loadQuestion();
  nextButton.addEventListener("click", nextQuestion);
  restartButton.addEventListener("click", restartQuiz);
  