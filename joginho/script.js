const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timerDisplay = document.getElementById('timer');
const target = document.getElementById('target');
const clickSound = document.getElementById('click-sound');

let score = 0;
let highScore = 0;
let timer = 20;
let countdown;

function updateScore() {
    scoreDisplay.textContent = score;
}

function updateHighScore() {
    highScoreDisplay.textContent = highScore;
}

function updateTimer() {
    timerDisplay.textContent = timer;
}

function getRandomPosition() {
    const width = window.innerWidth - target.offsetWidth;
    const height = window.innerHeight - target.offsetHeight;

    const randomX = Math.random() * width;
    const randomY = Math.random() * height;

    return { x: randomX, y: randomY };
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startGame() {
    score = 0;
    timer = 20;
    updateScore();
    updateTimer();

    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    target.style.backgroundColor = getRandomColor();
    const { x, y } = getRandomPosition();
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener('click', handleClick);

    countdown = setInterval(() => {
        timer--;
        updateTimer();

        if (timer === 0) {
            clearInterval(countdown);
            target.removeEventListener('click', handleClick);
            if (score > highScore) {
                highScore = score;
                updateHighScore();
            }
            alert(`Fim do jogo! Sua pontuação final é ${score}.`);
            startScreen.classList.remove('hidden');
            gameContainer.classList.add('hidden');
        }
    }, 1000);
}

function handleClick() {
    score++;
    updateScore();
    target.classList.add('clicked');
    setTimeout(() => {
        target.classList.remove('clicked');
    }, 300);
    target.style.backgroundColor = getRandomColor();
    const { x, y } = getRandomPosition();
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    clickSound.currentTime = 0;
    clickSound.play();
}

startButton.addEventListener('click', startGame);
