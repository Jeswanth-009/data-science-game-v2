# 🚀 DATA QUEST - Developer Quick Start Guide

## ⚡ Get Running in 2 Minutes

### Method 1: Double-Click (Simplest)
1. Navigate to your project folder
2. Double-click `index.html`
3. Game opens in your default browser
4. ✅ Done!

### Method 2: VS Code Live Server (Recommended for Development)
1. Open project folder in VS Code
2. Install "Live Server" extension (if not installed)
3. Right-click `index.html` → "Open with Live Server"
4. Auto-refreshes on every save
5. ✅ Done!

### Method 3: Python HTTP Server
```bash
# Navigate to project directory
cd data-science-games-v2

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

---

## 🎮 Testing Your Changes

### Test Checklist After Making Changes:

**Modified Main Menu?**
- [ ] Open `index.html` in browser
- [ ] Check all 3 level buttons work
- [ ] Verify scores display correctly
- [ ] Test "Reset Progress" button

**Modified Level 1?**
- [ ] Navigate from main menu to Level 1
- [ ] Play through all 5 stages
- [ ] Check score saves on completion
- [ ] Test "Back to Menu" button

**Modified Level 2?**
- [ ] Navigate from main menu to Level 2
- [ ] Verify canvas draws correctly
- [ ] Complete all 5 rounds
- [ ] Check score persistence

**Modified Level 3?**
- [ ] Navigate from main menu to Level 3
- [ ] Test all 4 event scenarios
- [ ] Verify metrics update in real-time
- [ ] Confirm final score calculation

---

## 🛠️ Common Development Tasks

### 1. Changing Colors

**Main Menu:**
Edit `styles.css` (root):
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Level 1 (Blue):**
Edit `level1/styles.css`:
```css
:root {
    --bg-gradient-start: #74b9ff;
    --bg-gradient-mid: #0984e3;
    --bg-gradient-end: #6c5ce7;
}
```

**Level 2 (Orange):**
Edit `level2/styles.css`:
```css
:root {
    --primary-color: #ff8c42;
    --primary-dark: #ff6f00;
}
```

**Level 3 (Purple):**
Edit `level3/styles.css`:
```css
:root {
    --primary-color: #9b59b6;
    --primary-dark: #8e44ad;
}
```

---

### 2. Adding New Events (Level 3)

Edit `level3/script.js` → `EVENTS` array:

```javascript
const EVENTS = [
    // ... existing events ...
    {
        icon: '🆕',
        title: 'Your New Event',
        description: 'Description of the scenario...',
        choices: [
            {
                text: 'Choice 1',
                effects: { accuracy: +10, bias: -5, trust: +5 },
                feedback: 'Result feedback...'
            },
            {
                text: 'Choice 2',
                effects: { accuracy: -5, bias: +10, trust: -10 },
                feedback: 'Result feedback...'
            },
            {
                text: 'Choice 3',
                effects: { accuracy: 0, bias: -5, trust: +15 },
                feedback: 'Result feedback...'
            }
        ]
    }
];
```

Don't forget to update `totalEvents` in gameState!

---

### 3. Modifying Score Calculations

**Level 1:**
Edit `level1/script.js` → `showFinalResults()`:
```javascript
const finalScore = Math.round(
    gameState.score + 
    gameState.accuracy * 1.5 +  // ← Adjust multiplier
    (100 - gameState.bias) + 
    gameState.cleaningScore +
    gameState.trainingQuality
);
```

**Level 2:**
Edit `level2/script.js` → `handleAnswer()`:
```javascript
if (isCorrect) {
    gameState.score += 100;  // ← Change points per question
}
```

**Level 3:**
Edit `level3/script.js` → `endGame()`:
```javascript
const finalScore = Math.round(
    (accuracyScore + biasScore + trustScore) / 3  // ← Adjust formula
);
```

---

### 4. Adding Sound Effects

1. Add sound files to `assets/sounds/`
2. In any script file:

```javascript
// At the top of file
const clickSound = new Audio('../assets/sounds/click.mp3');
const correctSound = new Audio('../assets/sounds/correct.mp3');

// When you want to play
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// Add to button click
button.addEventListener('click', () => {
    playClickSound();
    // ... rest of logic
});
```

---

### 5. Adding New Pattern Types (Level 2)

Edit `level2/script.js`:

```javascript
// 1. Add to PATTERNS object
const PATTERNS = {
    // ... existing patterns ...
    EXPONENTIAL: 'exponential'  // ← New pattern
};

// 2. Add label
const CHOICE_LABELS = {
    // ... existing labels ...
    [PATTERNS.EXPONENTIAL]: '📈 Exponential Growth'
};

// 3. Add generation logic in generateDataPoints()
case PATTERNS.EXPONENTIAL:
    for (let i = 0; i < numPoints; i++) {
        const value = 10 * Math.pow(1.15, i);
        points.push(value + (Math.random() * 5 - 2.5));
    }
    break;
```

---

### 6. Debugging Tips

**Check localStorage:**
```javascript
// In browser console (F12)
console.log(localStorage.getItem('level1Score'));
console.log(localStorage.getItem('level2Score'));
console.log(localStorage.getItem('level3Score'));

// Clear all scores
localStorage.clear();
```

**Check game state:**
```javascript
// Add at any point in your script
console.log('Current State:', gameState);
```

**Canvas issues (Level 2):**
```javascript
// Check if canvas initialized
console.log('Canvas:', canvas);
console.log('Context:', ctx);
console.log('Canvas size:', canvas.width, canvas.height);
```

---

## 📱 Mobile Testing

### Using Browser DevTools
1. Open game in Chrome/Firefox
2. Press F12 → Toggle device toolbar (Ctrl+Shift+M)
3. Select device (iPhone, iPad, etc.)
4. Test touch interactions

### On Real Device
1. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start local server (e.g., `python -m http.server 8000`)
3. On phone browser, go to `http://YOUR_IP:8000`
4. Test on actual device

---

## 🐛 Common Issues & Fixes

### Issue: Scores not saving
**Solution:**
```javascript
// Check if localStorage is available
if (typeof(Storage) !== "undefined") {
    localStorage.setItem('test', '123');
    console.log('localStorage works!');
} else {
    console.log('localStorage not supported');
}
```

### Issue: Canvas not drawing (Level 2)
**Solution:**
1. Check browser console for errors
2. Verify canvas element exists: `console.log(canvas)`
3. Check if parent container has size
4. Try: `setupCanvas()` call in `DOMContentLoaded`

### Issue: Navigation broken
**Solution:**
```javascript
// Check paths are relative
window.location.href = './level1/index.html';  // ✅ From root
window.location.href = '../index.html';        // ✅ From level
window.location.href = '/level1/index.html';   // ❌ Won't work locally
```

### Issue: Buttons not responding
**Solution:**
1. Check for event listener duplication
2. Use `.cloneNode(true)` to remove old listeners:
```javascript
const newBtn = oldBtn.cloneNode(true);
oldBtn.parentNode.replaceChild(newBtn, oldBtn);
// Then add fresh listener to newBtn
```

---

## 🚢 Deployment

### GitHub Pages
```bash
# Create repo on GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# In repo settings → Pages → Source: main branch → Save
# Your game will be live at: username.github.io/repo-name
```

### Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Sign in
3. Drag your project folder onto the dashboard
4. Get instant live URL!

### Vercel
```bash
npm i -g vercel
cd data-science-games-v2
vercel
# Follow prompts → get live URL
```

---

## 📊 Performance Optimization

### Reduce Initial Load Time
```javascript
// Lazy load fonts
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">
```

### Optimize Canvas (Level 2)
```javascript
// Use requestAnimationFrame for smooth drawing
function animate() {
    drawChart(dataPoints);
    requestAnimationFrame(animate);
}
```

### Minimize Reflows
```javascript
// Batch DOM changes
const fragment = document.createDocumentFragment();
choices.forEach(choice => {
    const button = document.createElement('button');
    // ... setup button
    fragment.appendChild(button);
});
container.appendChild(fragment);  // Single reflow
```

---

## 🧪 Automated Testing (Future)

Set up with Jest or similar:
```javascript
// Example test
test('Score persists in localStorage', () => {
    localStorage.setItem('level1Score', 450);
    const score = localStorage.getItem('level1Score');
    expect(score).toBe('450');
});
```

---

## 💡 Pro Tips

1. **Use browser's "Inspect Element"** to debug CSS issues live
2. **Console.log everything** when debugging game state
3. **Test on multiple browsers** (Chrome, Firefox, Safari)
4. **Clear localStorage** between tests to simulate new user
5. **Use Git commits** after each working feature
6. **Comment complex logic** for future you
7. **Keep backups** before major refactors

---

## 🎓 Learning Resources

### Web Fundamentals
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### Canvas API
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### LocalStorage
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Game Development
- [HTML5 Game Development](https://developer.mozilla.org/en-US/docs/Games)

---

## 🤝 Contributing

Want to improve the game?

1. Fork the repo
2. Create a feature branch: `git checkout -b new-feature`
3. Make changes
4. Test thoroughly
5. Commit: `git commit -m "Add new feature"`
6. Push: `git push origin new-feature`
7. Open Pull Request

---

## 📞 Need Help?

**Common Questions:**
1. Check this guide first
2. Review `README.md`
3. Check `FLOW-DIAGRAM.md` for architecture
4. Look at browser console for errors
5. Search MDN docs
6. Ask in GitHub Issues

---

**Happy Coding! 🎮✨**
