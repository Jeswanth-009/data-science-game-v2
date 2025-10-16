// ================================
// BIAS BREAKDOWN - LEVEL 3 SCRIPT
// ================================

// Game State
const gameState = {
    currentEvent: 0,
    accuracy: 70,  // Start lower
    bias: 60,      // Start higher
    trust: 60,     // Start lower
    eventsCompleted: 0,
    totalEvents: 7, // Increased from 4 to 7
    timeLeft: 30,   // Add time pressure
    timerInterval: null
};

// Events Database
const EVENTS = [
    {
        icon: '🚨',
        title: 'Bias Detected in Predictions',
        description: 'Your model shows 15% lower accuracy for a specific demographic group. Stakeholders are concerned about fairness.',
        choices: [
            {
                text: 'Retrain with balanced dataset immediately',
                effects: { accuracy: -5, bias: -20, trust: +15 },
                feedback: 'Good call! Fairness improved, though accuracy dipped slightly during retraining.'
            },
            {
                text: 'Continue deployment, monitor closely',
                effects: { accuracy: +5, bias: +10, trust: -20 },
                feedback: 'Risky move. Accuracy stayed high but trust dropped due to perceived inaction.'
            },
            {
                text: 'Add fairness constraints to model',
                effects: { accuracy: -3, bias: -15, trust: +10 },
                feedback: 'Balanced approach! You addressed bias while maintaining reasonable accuracy.'
            }
        ]
    },
    {
        icon: '📊',
        title: 'Training Data Quality Issue',
        description: 'You discover that 30% of your training data contains labeling errors. This affects model reliability.',
        choices: [
            {
                text: 'Clean all data before proceeding',
                effects: { accuracy: +15, bias: -5, trust: +10 },
                feedback: 'Excellent! Clean data improved accuracy and maintained trust.'
            },
            {
                text: 'Ship now, fix data incrementally',
                effects: { accuracy: -10, bias: +5, trust: -15 },
                feedback: 'Bad data led to poor predictions. Trust and accuracy both suffered.'
            },
            {
                text: 'Use data validation checks only',
                effects: { accuracy: +5, bias: 0, trust: +5 },
                feedback: 'Partial fix. Some improvement, but underlying issues remain.'
            }
        ]
    },
    {
        icon: '⚠️',
        title: 'Model Explains Poorly',
        description: 'Your model is a "black box" - stakeholders can\'t understand why it makes certain decisions. Transparency is demanded.',
        choices: [
            {
                text: 'Switch to interpretable model',
                effects: { accuracy: -10, bias: -5, trust: +20 },
                feedback: 'Transparency wins! Stakeholders appreciate understanding the decisions.'
            },
            {
                text: 'Add SHAP/LIME explanations',
                effects: { accuracy: 0, bias: 0, trust: +15 },
                feedback: 'Smart! You maintained performance while adding interpretability.'
            },
            {
                text: 'Keep current model, document well',
                effects: { accuracy: +5, bias: 0, trust: -10 },
                feedback: 'Documentation helps, but stakeholders still feel uncertain about decisions.'
            }
        ]
    },
    {
        icon: '🎯',
        title: 'Accuracy vs. Speed Trade-off',
        description: 'Users complain the model is too slow. You can optimize for speed but it may reduce accuracy.',
        choices: [
            {
                text: 'Optimize for speed, accept accuracy loss',
                effects: { accuracy: -15, bias: +5, trust: +10 },
                feedback: 'Users are happy with faster responses, but accuracy dropped noticeably.'
            },
            {
                text: 'Keep current model, explain value',
                effects: { accuracy: 0, bias: 0, trust: -5 },
                feedback: 'Some users remain frustrated, but those who value accuracy are satisfied.'
            },
            {
                text: 'Use model compression techniques',
                effects: { accuracy: -5, bias: 0, trust: +15 },
                feedback: 'Great engineering! You improved speed with minimal accuracy loss.'
            }
        ]
    },
    {
        icon: '💰',
        title: 'Budget Constraints Hit',
        description: 'Leadership cuts your budget by 40%. You need to decide what to sacrifice while keeping the model operational.',
        choices: [
            {
                text: 'Reduce data quality checks',
                effects: { accuracy: -12, bias: +15, trust: -20 },
                feedback: 'Cost saved, but data quality issues are causing serious problems.'
            },
            {
                text: 'Simplify model architecture',
                effects: { accuracy: -8, bias: +5, trust: +5 },
                feedback: 'Balanced compromise. Model is simpler but still functional.'
            },
            {
                text: 'Automate monitoring, cut manual reviews',
                effects: { accuracy: -5, bias: +8, trust: -5 },
                feedback: 'Automation helps, but you\'re missing some edge cases.'
            }
        ]
    },
    {
        icon: '🔐',
        title: 'Privacy Violation Detected',
        description: 'Your model inadvertently exposes sensitive user information in its predictions. This is a critical privacy breach.',
        choices: [
            {
                text: 'Immediately shut down and fix',
                effects: { accuracy: -20, bias: 0, trust: +25 },
                feedback: 'Right call! Privacy first. Trust soars despite temporary disruption.'
            },
            {
                text: 'Add privacy filters to outputs',
                effects: { accuracy: -10, bias: +5, trust: +15 },
                feedback: 'Quick fix that addresses the immediate issue effectively.'
            },
            {
                text: 'Limit affected features only',
                effects: { accuracy: -5, bias: +10, trust: -15 },
                feedback: 'Partial solution. Users notice the incomplete fix.'
            }
        ]
    },
    {
        icon: '🌍',
        title: 'Global Deployment Challenge',
        description: 'Your model performs well in the US but shows 30% worse accuracy in international markets. Cultural and language biases detected.',
        choices: [
            {
                text: 'Retrain with global diverse dataset',
                effects: { accuracy: +10, bias: -20, trust: +20 },
                feedback: 'Excellent! Model now works well across all regions.'
            },
            {
                text: 'Create region-specific models',
                effects: { accuracy: +15, bias: -10, trust: +10 },
                feedback: 'High accuracy everywhere, but complexity increased.'
            },
            {
                text: 'Focus on US market only',
                effects: { accuracy: +5, bias: +25, trust: -25 },
                feedback: 'Short-sighted decision. Global users feel excluded.'
            }
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }

    // Set total events display
    document.getElementById('total-events').textContent = gameState.totalEvents;
});

// Navigation
function goHome() {
    window.location.href = '../index.html';
}

function playAgain() {
    // Reset state
    gameState.currentEvent = 0;
    gameState.accuracy = 75;
    gameState.bias = 50;
    gameState.trust = 70;
    gameState.eventsCompleted = 0;

    // Reset UI
    updateMetricsDisplay();
    document.getElementById('current-event').textContent = '1';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    // Show game screen
    showScreen('game-screen');
    showEvent();
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
    updateMetricsDisplay();
    showEvent();
}

function showEvent() {
    if (gameState.currentEvent >= EVENTS.length) {
        endGame();
        return;
    }

    const event = EVENTS[gameState.currentEvent];

    // Update event counter
    document.getElementById('current-event').textContent = gameState.currentEvent + 1;

    // Update scenario
    document.getElementById('scenario-icon').textContent = event.icon;
    document.getElementById('scenario-title').textContent = event.title;
    document.getElementById('scenario-description').textContent = event.description;

    // Clear feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';

    // Start timer
    gameState.timeLeft = 30;
    startTimer();

    // Render choices
    renderChoices(event.choices);
}

// Timer function
function startTimer() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    const timerDisplay = document.getElementById('event-timer');
    if (!timerDisplay) {
        // Create timer display if it doesn't exist
        const header = document.querySelector('.game-header');
        const timerDiv = document.createElement('div');
        timerDiv.id = 'event-timer';
        timerDiv.className = 'event-timer';
        timerDiv.innerHTML = '<span class="timer-icon">⏱️</span> <span id="event-timer-seconds">30</span>s to decide';
        header.insertBefore(timerDiv, header.firstChild);
    }

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        const secondsDisplay = document.getElementById('event-timer-seconds');
        if (secondsDisplay) {
            secondsDisplay.textContent = gameState.timeLeft;
            
            // Change color when time is running out
            const timerDiv = document.getElementById('event-timer');
            if (gameState.timeLeft <= 10) {
                timerDiv.style.background = 'linear-gradient(135deg, #f56565 0%, #fc8181 100%)';
                timerDiv.style.color = 'white';
            }
        }

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(card => {
        card.style.pointerEvents = 'none';
    });

    // Random negative effects for timeout
    gameState.accuracy -= 10;
    gameState.bias += 10;
    gameState.trust -= 15;

    // Clamp values
    gameState.accuracy = Math.max(0, Math.min(100, gameState.accuracy));
    gameState.bias = Math.max(0, Math.min(100, gameState.bias));
    gameState.trust = Math.max(0, Math.min(100, gameState.trust));

    updateMetricsDisplay();

    const feedback = document.getElementById('feedback');
    feedback.textContent = '⏰ Time\'s up! Indecision hurts all metrics.';
    feedback.className = 'feedback negative show';

    gameState.eventsCompleted++;
    gameState.currentEvent++;

    setTimeout(() => {
        showEvent();
    }, 2500);
}

function renderChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    choices.forEach((choice, index) => {
        const card = document.createElement('div');
        card.className = 'choice-card';

        const text = document.createElement('div');
        text.className = 'choice-text';
        text.textContent = choice.text;

        const effects = document.createElement('div');
        effects.className = 'choice-effects';

        // Show effect badges
        if (choice.effects.accuracy !== 0) {
            const badge = createEffectBadge('Accuracy', choice.effects.accuracy);
            effects.appendChild(badge);
        }
        if (choice.effects.bias !== 0) {
            const badge = createEffectBadge('Bias', choice.effects.bias);
            effects.appendChild(badge);
        }
        if (choice.effects.trust !== 0) {
            const badge = createEffectBadge('Trust', choice.effects.trust);
            effects.appendChild(badge);
        }

        card.appendChild(text);
        card.appendChild(effects);

        card.addEventListener('click', () => handleChoice(choice, card));

        container.appendChild(card);
    });
}

function createEffectBadge(label, value) {
    const badge = document.createElement('span');
    const sign = value > 0 ? '+' : '';
    badge.textContent = `${label} ${sign}${value}`;
    
    if (value > 0) {
        badge.className = 'effect-badge effect-positive';
    } else if (value < 0) {
        badge.className = 'effect-badge effect-negative';
    } else {
        badge.className = 'effect-badge effect-neutral';
    }

    return badge;
}

function handleChoice(choice, selectedCard) {
    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    // Disable all choices
    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(card => {
        card.style.pointerEvents = 'none';
    });

    // Highlight selected choice
    selectedCard.style.borderColor = '#9b59b6';
    selectedCard.style.background = '#f4ecf7';

    // Apply effects (now more impactful)
    gameState.accuracy += choice.effects.accuracy;
    gameState.bias += choice.effects.bias;
    gameState.trust += choice.effects.trust;

    // Clamp values
    gameState.accuracy = Math.max(0, Math.min(100, gameState.accuracy));
    gameState.bias = Math.max(0, Math.min(100, gameState.bias));
    gameState.trust = Math.max(0, Math.min(100, gameState.trust));

    // Update display with animation
    setTimeout(() => {
        updateMetricsDisplay();
    }, 300);

    // Show feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = choice.feedback;
    
    // Determine feedback class based on trust change
    if (choice.effects.trust >= 10) {
        feedback.className = 'feedback positive show';
    } else if (choice.effects.trust <= -10) {
        feedback.className = 'feedback negative show';
    } else {
        feedback.className = 'feedback show';
    }

    // Move to next event
    gameState.eventsCompleted++;
    gameState.currentEvent++;

    setTimeout(() => {
        showEvent();
    }, 3000);
}

function updateMetricsDisplay() {
    // Update values
    document.getElementById('accuracy-value').textContent = Math.round(gameState.accuracy);
    document.getElementById('bias-value').textContent = Math.round(gameState.bias);
    document.getElementById('trust-value').textContent = Math.round(gameState.trust);

    // Update trust bar
    const trustBar = document.getElementById('trust-bar');
    trustBar.style.width = gameState.trust + '%';

    // Color trust bar based on value
    if (gameState.trust >= 70) {
        trustBar.className = 'trust-fill high';
    } else if (gameState.trust <= 40) {
        trustBar.className = 'trust-fill low';
    } else {
        trustBar.className = 'trust-fill';
    }
}

// End Game
function endGame() {
    // Calculate final score
    // Formula: Balance of high accuracy, low bias, high trust
    const accuracyScore = gameState.accuracy;
    const biasScore = (100 - gameState.bias); // Invert bias (lower is better)
    const trustScore = gameState.trust;

    const finalScore = Math.round((accuracyScore + biasScore + trustScore) / 3);

    // Save to localStorage (only if better than previous)
    const previousBest = parseInt(localStorage.getItem('level3Score')) || 0;
    if (finalScore > previousBest) {
        localStorage.setItem('level3Score', finalScore);
    }

    // Update results screen
    document.getElementById('final-accuracy').textContent = Math.round(gameState.accuracy);
    document.getElementById('final-bias').textContent = Math.round(gameState.bias);
    document.getElementById('final-trust').textContent = Math.round(gameState.trust);
    document.getElementById('final-score').textContent = finalScore;

    // Determine result message and icon
    let message = '';
    let icon = '🎉';

    // Stricter scoring criteria
    if (finalScore >= 90 && gameState.accuracy >= 75 && gameState.bias <= 40 && gameState.trust >= 75) {
        message = '🏆 LEGENDARY! You\'re an ethical AI master. Perfect balance achieved under extreme pressure!';
        icon = '🏆';
    } else if (finalScore >= 80) {
        message = '🌟 Outstanding! You made exceptional decisions balancing all constraints.';
        icon = '🌟';
    } else if (finalScore >= 65) {
        message = '👍 Good work! You understand the trade-offs, though some choices could be optimized.';
        icon = '👍';
    } else if (finalScore >= 50) {
        message = '💡 Challenging, right? AI ethics requires careful consideration of competing priorities.';
        icon = '�';
    } else {
        message = '� Keep learning! These are tough decisions - try different strategies next time.';
        icon = '�';
    }

    document.getElementById('result-message').textContent = message;
    document.getElementById('results-icon').textContent = icon;

    showScreen('results-screen');
}
