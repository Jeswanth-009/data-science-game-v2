// Game State
const gameState = {
    currentStage: 0,
    score: 0,
    accuracy: 50,
    bias: 30,
    speed: 50,
    f1Score: 0,
    dataSource: '',
    cleaningScore: 0,
    selectedModel: '',
    trainingQuality: 0,
    optimization: ''
};

// Stage Management
function showStage(stageNumber) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('exit-left');
    });
    
    // Show target screen
    const targetScreen = stageNumber === 0 ? 
        document.getElementById('start-screen') : 
        document.getElementById(`stage${stageNumber}`);
    
    setTimeout(() => {
        screens.forEach(screen => screen.classList.remove('exit-left'));
        targetScreen.classList.add('active');
    }, 300);
    
    // Update progress dots
    updateProgressDots(stageNumber);
    
    // Initialize stage
    gameState.currentStage = stageNumber;
    initializeStage(stageNumber);
}

function updateProgressDots(stageNumber) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === stageNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function initializeStage(stageNumber) {
    switch(stageNumber) {
        case 1:
            startStage1();
            break;
        case 2:
            startStage2();
            break;
        case 3:
            startStage3();
            break;
        case 4:
            startStage4();
            break;
        case 5:
            startStage5();
            break;
    }
}

// Stage 1: Data Collection
function startStage1() {
    startTimer('timer1', 30);
    
    const dataOptions = document.querySelectorAll('.data-option');
    
    // Remove old listeners by cloning
    dataOptions.forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
    });
    
    // Add new listeners
    const freshOptions = document.querySelectorAll('.data-option');
    freshOptions.forEach(option => {
        option.addEventListener('click', function() {
            const source = this.dataset.source;
            gameState.dataSource = source;
            
            // Apply stats based on choice
            if (source === 'gov') {
                gameState.accuracy += 12;
                gameState.bias -= 8;
            } else if (source === 'web') {
                gameState.accuracy += 25;
                gameState.bias += 12;
            } else if (source === 'user') {
                gameState.accuracy += 18;
                gameState.bias += 18;
            }
            
            showTip('Data Source', `You chose ${source} data! Remember: more data isn't always better if it's biased.`);
            setTimeout(() => showStage(2), 2000);
        });
    });
}

// Stage 2: Data Cleaning
let cleaningInterval = null;
let cleaningTimeout = null;

function startStage2() {
    startTimer('timer2', 20);
    gameState.cleaningScore = 0;
    
    const cleaningArea = document.getElementById('cleaning-area');
    const scoreDisplay = document.getElementById('cleaning-score');
    
    // Clear previous icons
    cleaningArea.innerHTML = '';
    
    // Clear any existing intervals
    if (cleaningInterval) clearInterval(cleaningInterval);
    if (cleaningTimeout) clearTimeout(cleaningTimeout);
    
    // Spawn falling icons
    cleaningInterval = setInterval(() => {
        if (gameState.currentStage !== 2) {
            clearInterval(cleaningInterval);
            return;
        }
        
        const icon = document.createElement('div');
        icon.className = 'falling-icon';
        icon.textContent = Math.random() > 0.5 ? '🦠' : '💾';
        icon.style.left = Math.random() * 80 + '%';
        icon.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        icon.addEventListener('click', function() {
            if (this.textContent === '🦠') {
                gameState.cleaningScore += 10;
                gameState.accuracy += 2;
                this.textContent = '✓';
            } else {
                gameState.cleaningScore -= 5;
                gameState.accuracy -= 1;
                this.textContent = '✗';
            }
            scoreDisplay.textContent = gameState.cleaningScore;
            setTimeout(() => this.remove(), 200);
        });
        
        cleaningArea.appendChild(icon);
        
        // Remove icon after animation
        setTimeout(() => {
            if (icon.parentNode) icon.remove();
        }, 5000);
    }, 800);
    
    // Move to next stage after time
    cleaningTimeout = setTimeout(() => {
        clearInterval(cleaningInterval);
        showTip('Data Cleaning', `You scored ${gameState.cleaningScore}! Clean data is crucial for model performance.`);
        setTimeout(() => showStage(3), 2000);
    }, 20000);
}

// Stage 3: Model Training
let trainingInterval = null;

function startStage3() {
    startTimer('timer3', 25);
    
    // Reset training area
    const trainingArea = document.getElementById('training-area');
    const modelSelection = document.getElementById('model-selection');
    trainingArea.style.display = 'none';
    modelSelection.style.display = 'flex';
    
    const modelCards = document.querySelectorAll('.model-card');
    
    // Remove old listeners
    modelCards.forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });
    
    // Add new listeners
    const freshCards = document.querySelectorAll('.model-card');
    freshCards.forEach(card => {
        card.addEventListener('click', function() {
            freshCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            gameState.selectedModel = this.dataset.model;
            
            // Apply model characteristics
            if (gameState.selectedModel === 'linear') {
                gameState.speed += 20;
                gameState.accuracy += 5;
            } else if (gameState.selectedModel === 'forest') {
                gameState.speed += 10;
                gameState.accuracy += 15;
            } else if (gameState.selectedModel === 'neural') {
                gameState.speed -= 10;
                gameState.accuracy += 25;
            }
            
            // Show training area
            modelSelection.style.display = 'none';
            trainingArea.style.display = 'block';
            
            initTraining();
        });
    });
}

function initTraining() {
    const trainBtn = document.getElementById('train-btn');
    const progressFill = document.getElementById('training-progress');
    
    // Clear old listeners
    const newBtn = trainBtn.cloneNode(true);
    trainBtn.parentNode.replaceChild(newBtn, trainBtn);
    const freshBtn = document.getElementById('train-btn');
    
    let progress = 0;
    let isHolding = false;
    
    function startTraining(e) {
        e.preventDefault();
        isHolding = true;
        progress = 0;
        
        if (trainingInterval) clearInterval(trainingInterval);
        
        trainingInterval = setInterval(() => {
            if (isHolding && progress < 100) {
                progress += 2;
                progressFill.style.width = progress + '%';
            }
        }, 100);
    }
    
    function stopTraining(e) {
        e.preventDefault();
        if (!isHolding) return;
        
        isHolding = false;
        clearInterval(trainingInterval);
        
        // Check if released in sweet spot (60-80%)
        if (progress >= 60 && progress <= 80) {
            gameState.trainingQuality = 100;
            gameState.accuracy += 15;
            showTip('Perfect!', 'You released at the perfect time! Your model is well-trained.');
        } else if (progress < 60) {
            gameState.trainingQuality = 50;
            gameState.accuracy -= 10;
            showTip('Undertrained', 'Released too early! Your model needs more training.');
        } else {
            gameState.trainingQuality = 70;
            gameState.accuracy += 5;
            showTip('Overtrained', 'A bit overtrained, but still usable!');
        }
        
        setTimeout(() => showStage(4), 2000);
    }
    
    freshBtn.addEventListener('mousedown', startTraining);
    freshBtn.addEventListener('touchstart', startTraining);
    freshBtn.addEventListener('mouseup', stopTraining);
    freshBtn.addEventListener('touchend', stopTraining);
    freshBtn.addEventListener('mouseleave', stopTraining);
}

// Stage 4: Evaluation
function startStage4() {
    startTimer('timer4', 20);
    
    // Calculate F1 score
    gameState.f1Score = Math.min(100, Math.max(0, 
        (gameState.accuracy - gameState.bias / 2) * 0.8
    ));
    
    // Display metrics
    document.getElementById('accuracy-display').textContent = 
        Math.round(gameState.accuracy) + '%';
    document.getElementById('bias-display').textContent = 
        Math.round(gameState.bias) + '%';
    document.getElementById('f1-display').textContent = 
        gameState.f1Score.toFixed(1);
    document.getElementById('speed-display').textContent = 
        Math.round(gameState.speed) + ' ms';
    
    // Optimization choices
    const choiceBtns = document.querySelectorAll('.choice-btn');
    
    // Remove old listeners
    choiceBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Add new listeners
    const freshBtns = document.querySelectorAll('.choice-btn');
    freshBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            gameState.optimization = this.dataset.optimize;
            
            if (gameState.optimization === 'accuracy') {
                gameState.score += gameState.accuracy * 2;
            } else if (gameState.optimization === 'fairness') {
                gameState.score += (100 - gameState.bias) * 2;
            } else if (gameState.optimization === 'speed') {
                gameState.score += gameState.speed * 1.5;
            }
            
            showTip('Optimization', `You optimized for ${gameState.optimization}! Different use cases need different priorities.`);
            setTimeout(() => showStage(5), 2000);
        });
    });
}

// Stage 5: Deployment
let deploymentInterval = null;

function startStage5() {
    const events = [
        { text: '🚀 Model deployed to production...', score: 0 },
        { text: '📊 Processing first batch of data...', score: 10 },
        { text: '✅ Users are engaging with predictions!', score: 20 },
        { text: '⚠️ Edge case detected - model adapting...', score: -5 },
        { text: '📈 Performance metrics looking good!', score: 15 }
    ];
    
    const eventsContainer = document.getElementById('deployment-events');
    const finalResults = document.getElementById('final-results');
    
    // Reset display
    eventsContainer.innerHTML = '';
    eventsContainer.style.display = 'flex';
    finalResults.style.display = 'none';
    
    let eventIndex = 0;
    
    if (deploymentInterval) clearInterval(deploymentInterval);
    
    deploymentInterval = setInterval(() => {
        if (eventIndex >= events.length) {
            clearInterval(deploymentInterval);
            setTimeout(showFinalResults, 1000);
            return;
        }
        
        const event = events[eventIndex];
        gameState.score += event.score;
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.textContent = event.text;
        eventsContainer.appendChild(eventCard);
        
        eventIndex++;
    }, 1500);
}

function showFinalResults() {
    const finalResults = document.getElementById('final-results');
    const deploymentEvents = document.getElementById('deployment-events');
    
    deploymentEvents.style.display = 'none';
    finalResults.style.display = 'block';
    
    // Calculate final score
    const finalScore = Math.round(
        gameState.score + 
        gameState.accuracy * 1.5 + 
        (100 - gameState.bias) + 
        gameState.cleaningScore +
        gameState.trainingQuality
    );
    
    document.getElementById('final-score').textContent = finalScore;
    
    // Save score to localStorage (only if better than previous)
    const previousBest = parseInt(localStorage.getItem('level1Score')) || 0;
    if (finalScore > previousBest) {
        localStorage.setItem('level1Score', finalScore);
    }
    
    // Determine result title
    let resultTitle = '';
    let resultBreakdown = '';
    
    if (finalScore >= 450) {
        resultTitle = '🏆 ML Master!';
        resultBreakdown = 'Outstanding! You built a high-quality, well-balanced model. You understand the trade-offs!';
    } else if (finalScore >= 350) {
        resultTitle = '🌟 Data Scientist';
        resultBreakdown = 'Great job! Your model is solid and production-ready with minor improvements needed.';
    } else if (finalScore >= 250) {
        resultTitle = '📊 Junior Developer';
        resultBreakdown = 'Good effort! You\'ve got the basics down, but there\'s room to optimize your approach.';
    } else {
        resultTitle = '🔧 Keep Learning!';
        resultBreakdown = 'Don\'t worry! ML is complex. Every expert started here. Try different strategies!';
    }
    
    document.getElementById('result-title').textContent = resultTitle;
    document.getElementById('result-breakdown').textContent = resultBreakdown;
    
    // Play again button
    const playAgainBtn = document.getElementById('play-again-btn');
    const newPlayBtn = playAgainBtn.cloneNode(true);
    playAgainBtn.parentNode.replaceChild(newPlayBtn, playAgainBtn);
    
    document.getElementById('play-again-btn').addEventListener('click', () => {
        resetGame();
        showStage(0);
    });
}

// Utility Functions
let timerIntervals = {};

function startTimer(timerId, duration) {
    // Clear any existing timer
    if (timerIntervals[timerId]) {
        clearInterval(timerIntervals[timerId]);
    }
    
    const timerFill = document.getElementById(timerId);
    let timeLeft = duration;
    
    timerIntervals[timerId] = setInterval(() => {
        timeLeft -= 0.1;
        const percentage = (timeLeft / duration) * 100;
        timerFill.style.width = percentage + '%';
        
        if (timeLeft <= 0) {
            clearInterval(timerIntervals[timerId]);
        }
    }, 100);
}

function showTip(title, text) {
    const overlay = document.getElementById('tip-overlay');
    const tipTitle = document.getElementById('tip-title');
    const tipText = document.getElementById('tip-text');
    const tipContinue = document.getElementById('tip-continue');
    
    tipTitle.textContent = title;
    tipText.textContent = text;
    overlay.style.display = 'flex';
    
    // Remove old listener
    const newBtn = tipContinue.cloneNode(true);
    tipContinue.parentNode.replaceChild(newBtn, tipContinue);
    
    document.getElementById('tip-continue').onclick = () => {
        overlay.style.display = 'none';
    };
}

function resetGame() {
    // Clear all intervals
    if (cleaningInterval) clearInterval(cleaningInterval);
    if (cleaningTimeout) clearTimeout(cleaningTimeout);
    if (trainingInterval) clearInterval(trainingInterval);
    if (deploymentInterval) clearInterval(deploymentInterval);
    Object.values(timerIntervals).forEach(interval => clearInterval(interval));
    timerIntervals = {};
    
    // Reset state
    gameState.currentStage = 0;
    gameState.score = 0;
    gameState.accuracy = 50;
    gameState.bias = 30;
    gameState.speed = 50;
    gameState.f1Score = 0;
    gameState.dataSource = '';
    gameState.cleaningScore = 0;
    gameState.selectedModel = '';
    gameState.trainingQuality = 0;
    gameState.optimization = '';
    
    // Reset UI
    document.getElementById('cleaning-area').innerHTML = '';
    document.getElementById('cleaning-score').textContent = '0';
    document.getElementById('model-selection').style.display = 'flex';
    document.getElementById('training-area').style.display = 'none';
    document.getElementById('training-progress').style.width = '0%';
    document.getElementById('deployment-events').innerHTML = '';
    document.getElementById('final-results').style.display = 'none';
    document.getElementById('deployment-events').style.display = 'flex';
    
    // Remove selected class from model cards
    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Navigation to Main Menu
function goBackToMenu() {
    window.location.href = '../index.html';
}

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
    // Ensure start screen is visible
    showStage(0);
    
    document.getElementById('start-btn').addEventListener('click', () => {
        showStage(1);
    });
});