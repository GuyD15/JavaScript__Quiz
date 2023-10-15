// Variables for quiz state
let questionIndex = 0;
let remainingTime = 60;
let timer;

// DOM element references
const questionSection = document.querySelector('#questions');
const timeDisplay = document.querySelector('#time');
const optionList = document.querySelector('#choices');
const submitButton = document.querySelector('#submit');
const beginButton = document.querySelector('#start');
const playerName = document.querySelector('#initials');
const feedbackSection = document.querySelector('#feedback');

// Start the quiz
function initiateQuiz() {
  const introScreen = document.querySelector('#start-screen');
  introScreen.classList.add('hide');
  questionSection.classList.remove('hide');
  timer = setInterval(updateClock, 1000);
  timeDisplay.textContent = remainingTime;
  loadQuestion();
}

// Load the current question
function loadQuestion() {
  const question = questions[questionIndex];
  const questionTitle = document.querySelector('#question-title');
  questionTitle.textContent = question.title;
  optionList.innerHTML = '';

  question.choices.forEach((choice, idx) => {
    const choiceButton = document.createElement('button');
    choiceButton.classList.add('choice');
    choiceButton.value = choice;
    choiceButton.textContent = `${idx + 1}. ${choice}`;
    optionList.appendChild(choiceButton);
  });
}

// Handle choice selection
function handleChoiceSelection(event) {
  const selectedOption = event.target;
  if (!selectedOption.classList.contains('choice')) return;

  const correctAnswer = questions[questionIndex].answer;
  if (selectedOption.value !== correctAnswer) {
    remainingTime -= 10;
    timeDisplay.textContent = remainingTime;
    displayFeedback('Wrong!', 'feedback wrong');
  } else {
    displayFeedback('Correct!', 'feedback correct');
  }

  questionIndex++;
  if (questionIndex === questions.length || remainingTime <= 0) {
    endQuiz();
  } else {
    loadQuestion();
  }
}

// Display feedback for the user's choice
function displayFeedback(message, className) {
  feedbackSection.textContent = message;
  feedbackSection.className = className;
  setTimeout(() => {
    feedbackSection.textContent = '';
    feedbackSection.className = '';
  }, 500);
}

// End the quiz
function endQuiz() {
  clearInterval(timer);
  questionSection.classList.add('hide');
  const resultScreen = document.querySelector('#end-screen');
  resultScreen.classList.remove('hide');
  const scoreDisplay = document.querySelector('#final-score');
  scoreDisplay.textContent = remainingTime;
  storeHighscore();
}

// Update the timer
function updateClock() {
  remainingTime--;
  timeDisplay.textContent = remainingTime;
  if (remainingTime <= 0) {
    endQuiz();
  }
}

// Store the highscore
function storeHighscore() {
  const initials = playerName.value.trim();
  if (initials) {
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    const scoreEntry = {
      score: remainingTime,
      initials: initials,
    };
    highscores.push(scoreEntry);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    playerName.value = '';
    window.location.href = 'highscores.html';
  }
}

// Event listeners
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  storeHighscore();
});
playerName.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    storeHighscore();
  }
});
beginButton.addEventListener('click', initiateQuiz);
optionList.addEventListener('click', handleChoiceSelection);
