// ================================
// DATA QUEST - MAIN MENU SCRIPT
// ================================

// Navigation
function playLevel(levelNumber) {
    switch(levelNumber) {
        case 1:
            window.location.href = './level1/index.html';
            break;
        case 2:
            window.location.href = './level2/index.html';
            break;
        case 3:
            window.location.href = './level3/index.html';
            break;
        default:
            console.error('Invalid level number');
    }
}

// Score Management
function loadScores() {
    const score1 = localStorage.getItem('level1Score') || '--';
    const score2 = localStorage.getItem('level2Score') || '--';
    const score3 = localStorage.getItem('level3Score') || '--';

    document.getElementById('score-1').textContent = score1;
    document.getElementById('score-2').textContent = score2;
    document.getElementById('score-3').textContent = score3;

    updateProgressStats(score1, score2, score3);
}

function updateProgressStats(s1, s2, s3) {
    // Calculate total score
    let total = 0;
    let completed = 0;

    if (s1 !== '--') {
        total += parseInt(s1);
        completed++;
    }
    if (s2 !== '--') {
        total += parseInt(s2);
        completed++;
    }
    if (s3 !== '--') {
        total += parseInt(s3);
        completed++;
    }

    document.getElementById('total-score').textContent = total;
    document.getElementById('levels-completed').textContent = completed + '/3';

    // Determine rank based on total score
    let rank = 'Beginner';
    if (total >= 1200) {
        rank = 'Legend';
    } else if (total >= 1000) {
        rank = 'Master';
    } else if (total >= 700) {
        rank = 'Expert';
    } else if (total >= 400) {
        rank = 'Advanced';
    } else if (total > 0) {
        rank = 'Novice';
    }

    document.getElementById('rank-title').textContent = rank;
}

function resetProgress() {
    const confirmed = confirm('Are you sure you want to reset all progress? This cannot be undone.');
    
    if (confirmed) {
        localStorage.removeItem('level1Score');
        localStorage.removeItem('level2Score');
        localStorage.removeItem('level3Score');
        
        loadScores();
        
        // Show feedback
        alert('✅ Progress reset successfully!');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadScores();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});
