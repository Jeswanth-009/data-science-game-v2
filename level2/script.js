// ================================
// DATA DETECTIVE - LEVEL 2 SCRIPT
// ================================

// Game State
const gameState = {
    currentRound: 1,
    totalRounds: 10, // Increased from 5 to 10
    score: 0,
    correctAnswers: 0,
    currentPattern: null,
    correctChoice: null,
    timeLeft: 15, // Added time limit per round
    timerInterval: null
};

// Pattern Types
const PATTERNS = {
    INCREASING: 'increasing',
    DECREASING: 'decreasing',
    FLAT: 'flat',
    RANDOM: 'random',
    CYCLICAL: 'cyclical',
    EXPONENTIAL: 'exponential', // New harder pattern
    LOGARITHMIC: 'logarithmic', // New harder pattern
    STEP: 'step', // New harder pattern
    VOLATILE: 'volatile' // New harder pattern
};

// Choice Labels
const CHOICE_LABELS = {
    [PATTERNS.INCREASING]: '📈 Linear Increase',
    [PATTERNS.DECREASING]: '📉 Linear Decrease',
    [PATTERNS.FLAT]: '➖ Flat / Stationary',
    [PATTERNS.RANDOM]: '🎲 Random Noise',
    [PATTERNS.CYCLICAL]: '🔄 Cyclical Pattern',
    [PATTERNS.EXPONENTIAL]: '🚀 Exponential Growth',
    [PATTERNS.LOGARITHMIC]: '📊 Logarithmic Growth',
    [PATTERNS.STEP]: '🪜 Step Function',
    [PATTERNS.VOLATILE]: '⚡ High Volatility'
};

// Canvas Setup
let canvas;
let ctx;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('chart-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        setupCanvas();
    }

    // Start button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
});

function setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = (rect.height - 32) * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = (rect.height - 32) + 'px';
    ctx.scale(dpr, dpr);
}

// Navigation
function goHome() {
    window.location.href = '../index.html';
}

function playAgain() {
    // Reset state
    gameState.currentRound = 1;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.currentPattern = null;
    gameState.correctChoice = null;

    // Reset UI
    document.getElementById('score').textContent = '0';
    document.getElementById('current-round').textContent = '1';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    // Show game screen
    showScreen('game-screen');
    startRound();
}

// Screen Management
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Game Flow
function startGame() {
    showScreen('game-screen');
    startRound();
}

function startRound() {
    // Update UI
    document.getElementById('current-round').textContent = gameState.currentRound;
    document.getElementById('score').textContent = gameState.score;
    
    // Clear feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';

    // Reset timer
    gameState.timeLeft = 15;
    startTimer();

    // Generate new chart
    generateChart();

    // Render choices
    renderChoices();
}

// Timer function
function startTimer() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) {
        // Create timer display if it doesn't exist
        const header = document.querySelector('.game-header');
        const timerDiv = document.createElement('div');
        timerDiv.id = 'timer-display';
        timerDiv.className = 'timer-display';
        timerDiv.innerHTML = '<span class="timer-icon">⏱️</span> <span id="timer-seconds">15</span>s';
        header.appendChild(timerDiv);
    }

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        const secondsDisplay = document.getElementById('timer-seconds');
        if (secondsDisplay) {
            secondsDisplay.textContent = gameState.timeLeft;
        }

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    const allButtons = document.querySelectorAll('.choice-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById('feedback');
    feedback.textContent = `⏰ Time's up! It was a ${CHOICE_LABELS[gameState.correctChoice]}`;
    feedback.className = 'feedback incorrect show';

    // Move to next round
    setTimeout(() => {
        if (gameState.currentRound < gameState.totalRounds) {
            gameState.currentRound++;
            startRound();
        } else {
            endGame();
        }
    }, 2000);
}

// Chart Generation
function generateChart() {
    // Choose random pattern
    const patternKeys = Object.values(PATTERNS);
    const randomPattern = patternKeys[Math.floor(Math.random() * patternKeys.length)];
    gameState.currentPattern = randomPattern;
    gameState.correctChoice = randomPattern;

    // Generate data based on pattern
    const dataPoints = generateDataPoints(randomPattern);

    // Draw chart
    drawChart(dataPoints);
}

function generateDataPoints(pattern) {
    const numPoints = 20;
    const points = [];

    switch(pattern) {
        case PATTERNS.INCREASING:
            for (let i = 0; i < numPoints; i++) {
                const value = 20 + (i * 3) + (Math.random() * 10 - 5);
                points.push(value);
            }
            break;

        case PATTERNS.DECREASING:
            for (let i = 0; i < numPoints; i++) {
                const value = 80 - (i * 3) + (Math.random() * 10 - 5);
                points.push(value);
            }
            break;

        case PATTERNS.FLAT:
            const flatValue = 50 + (Math.random() * 20 - 10);
            for (let i = 0; i < numPoints; i++) {
                points.push(flatValue + (Math.random() * 6 - 3));
            }
            break;

        case PATTERNS.RANDOM:
            for (let i = 0; i < numPoints; i++) {
                points.push(Math.random() * 80 + 10);
            }
            break;

        case PATTERNS.CYCLICAL:
            for (let i = 0; i < numPoints; i++) {
                const value = 50 + Math.sin(i * 0.5) * 25;
                points.push(value + (Math.random() * 6 - 3));
            }
            break;

        case PATTERNS.EXPONENTIAL:
            for (let i = 0; i < numPoints; i++) {
                const value = 20 * Math.pow(1.12, i);
                points.push(Math.min(90, value + (Math.random() * 5 - 2.5)));
            }
            break;

        case PATTERNS.LOGARITHMIC:
            for (let i = 0; i < numPoints; i++) {
                const value = 20 + Math.log(i + 1) * 15;
                points.push(value + (Math.random() * 5 - 2.5));
            }
            break;

        case PATTERNS.STEP:
            let stepValue = 30;
            for (let i = 0; i < numPoints; i++) {
                if (i % 5 === 0 && i > 0) {
                    stepValue += 15;
                }
                points.push(stepValue + (Math.random() * 4 - 2));
            }
            break;

        case PATTERNS.VOLATILE:
            let baseValue = 50;
            for (let i = 0; i < numPoints; i++) {
                baseValue += (Math.random() * 20 - 10);
                baseValue = Math.max(20, Math.min(80, baseValue));
                points.push(baseValue);
            }
            break;
    }

    return points;
}

function drawChart(dataPoints) {
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw data line
    ctx.strokeStyle = '#ff8c42';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    const xStep = chartWidth / (dataPoints.length - 1);
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const valueRange = maxValue - minValue || 1;

    dataPoints.forEach((value, index) => {
        const x = padding + (index * xStep);
        const normalizedValue = (value - minValue) / valueRange;
        const y = height - padding - (normalizedValue * chartHeight);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#ff6f00';
    dataPoints.forEach((value, index) => {
        const x = padding + (index * xStep);
        const normalizedValue = (value - minValue) / valueRange;
        const y = height - padding - (normalizedValue * chartHeight);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Labels
    ctx.fillStyle = '#718096';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Time →', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Value →', 0, 0);
    ctx.restore();
}

// Choice Rendering
function renderChoices() {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    // Get 3 random choices including the correct one
    const choices = getRandomChoices();

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = CHOICE_LABELS[choice];
        button.dataset.choice = choice;
        button.addEventListener('click', () => handleAnswer(choice, button));
        container.appendChild(button);
    });
}

function getRandomChoices() {
    const allPatterns = Object.values(PATTERNS);
    const choices = [gameState.correctChoice];

    // Add 3 more random (but different) choices for harder difficulty
    while (choices.length < 4) {
        const randomChoice = allPatterns[Math.floor(Math.random() * allPatterns.length)];
        if (!choices.includes(randomChoice)) {
            choices.push(randomChoice);
        }
    }

    // Shuffle
    return choices.sort(() => Math.random() - 0.5);
}

// Answer Handling
function handleAnswer(selectedChoice, button) {
    // Clear timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    const allButtons = document.querySelectorAll('.choice-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById('feedback');
    const isCorrect = selectedChoice === gameState.correctChoice;

    if (isCorrect) {
        button.classList.add('correct');
        // Bonus points for time remaining (reduced from 100 to 50 base)
        const timeBonus = gameState.timeLeft * 3;
        const roundScore = 50 + timeBonus;
        gameState.score += roundScore;
        gameState.correctAnswers++;
        feedback.textContent = `✅ Correct! +${roundScore} pts (${timeBonus} time bonus)`;
        feedback.className = 'feedback correct show';
    } else {
        button.classList.add('incorrect');
        feedback.textContent = `❌ Wrong! It was ${CHOICE_LABELS[gameState.correctChoice]}`;
        feedback.className = 'feedback incorrect show';
        // Penalty for wrong answer
        gameState.score = Math.max(0, gameState.score - 20);
    }

    // Update score display
    document.getElementById('score').textContent = gameState.score;

    // Move to next round or end game
    setTimeout(() => {
        if (gameState.currentRound < gameState.totalRounds) {
            gameState.currentRound++;
            startRound();
        } else {
            endGame();
        }
    }, 2000);
}

// End Game
function endGame() {
    // Save score to localStorage
    const previousBest = parseInt(localStorage.getItem('level2Score')) || 0;
    if (gameState.score > previousBest) {
        localStorage.setItem('level2Score', gameState.score);
    }

    // Show results
    document.getElementById('final-score').textContent = gameState.score;

    let message = '';
    const accuracy = (gameState.correctAnswers / gameState.totalRounds) * 100;

    if (accuracy === 100 && gameState.score >= 700) {
        message = '🏆 LEGENDARY! Perfect score with amazing speed! You\'re a data visualization master!';
    } else if (accuracy >= 90) {
        message = '🌟 Outstanding! You have an exceptional eye for complex data patterns!';
    } else if (accuracy >= 70) {
        message = '🔥 Great work! You\'re a skilled analyst who can spot trends quickly!';
    } else if (accuracy >= 50) {
        message = '👍 Good effort! Keep practicing - these patterns are tricky!';
    } else {
        message = '� Keep pushing! Advanced pattern recognition takes time to master.';
    }

    document.getElementById('result-message').textContent = message;

    showScreen('results-screen');
}
