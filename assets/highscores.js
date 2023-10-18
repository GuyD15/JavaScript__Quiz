const highscoresListEl = document.getElementById('highscores-list');
const clearBtn = document.getElementById('clear-scores');

// Load high scores from local storage
function loadHighscores() {
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscoresListEl.innerHTML = highscores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join('');
}

// Clear high scores from local storage
function clearHighscores() {
    localStorage.removeItem('highscores');
    loadHighscores();
}

clearBtn.addEventListener('click', clearHighscores);

// Load high scores when the page loads
loadHighscores();
