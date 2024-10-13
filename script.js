let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isPaused = false;
let sessionCount = 0;
let isWorkSession = true;

const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const skipButton = document.getElementById('skip');
const resetButton = document.getElementById('reset');
const sound = document.getElementById('sound');

function updateDisplay() {
    displayMinutes.textContent = minutes.toString().padStart(2, '0');
    displaySeconds.textContent = seconds.toString().padStart(2, '0');
}

function playSound() {
    sound.play();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    handleSessionEnd();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        isPaused = true;
    }
}

function skipSession() {
    clearInterval(timer);
    handleSessionEnd();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    minutes = 25;
    seconds = 0;
    sessionCount = 0;
    isWorkSession = true;
    updateDisplay();
}

function handleSessionEnd() {
    playSound();
    if (isWorkSession) {
        sessionCount++;
        if (sessionCount === 4) {
            alert("Pausa longa! Descanse por 30 minutos.");
            minutes = 30;
            sessionCount = 0;
        } else {
            alert("Pausa curta! Descanse por 15 minutos.");
            minutes = 15;
        }
    } else {
        alert("Hora de voltar ao trabalho! 25 minutos.");
        minutes = 25;
    }
    seconds = 0;
    isWorkSession = !isWorkSession;
    isRunning = false; // Desativa o estado de rodando
    updateDisplay();
}

startButton.addEventListener('click', () => {
    if (!isPaused) {
        startTimer();
    } else {
        startTimer();
    }
});

pauseButton.addEventListener('click', pauseTimer);
skipButton.addEventListener('click', skipSession);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
