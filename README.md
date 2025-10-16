# 🎮 DATA QUEST - Complete Multi-Level Game

**A professional, modular data science educational game with 3 unique levels**

---

## 📂 Project Structure

```
DataQuest/
│
├── index.html              # Main menu / launcher
├── styles.css              # Main menu styles
├── script.js               # Main menu logic
│
├── level1/                 # Model Mayhem
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── level2/                 # Data Detective
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── level3/                 # Bias Breakdown
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── assets/                 # Media files
│   ├── icons/
│   ├── sounds/
│   ├── images/
│   └── README.md
│
└── README.md               # This file
```

---

## 🎯 Game Overview

### Main Menu
- **Purpose**: Central hub for launching levels
- **Features**:
  - 3 level cards with descriptions
  - Score tracking via localStorage
  - Overall progress display (total score, levels completed, rank)
  - Reset progress functionality
- **Design**: Clean gradient background (purple theme)

### Level 1: Model Mayhem 🤖
- **Theme**: Blue gradient
- **Duration**: 4-5 minutes
- **Gameplay**: 5-stage ML pipeline simulation
  1. Data Collection (choice-based)
  2. Data Cleaning (tap game)
  3. Model Training (timing game)
  4. Evaluation (optimization choice)
  5. Deployment (event sequence)
- **Concepts**: End-to-end ML workflow, decision-making under pressure
- **Score**: Based on accuracy, bias reduction, cleaning performance

### Level 2: Data Detective 🔍
- **Theme**: Orange gradient
- **Duration**: 3 minutes
- **Gameplay**: 5 rounds of pattern recognition
  - View dynamically generated charts on canvas
  - Identify patterns: increasing, decreasing, flat, random, cyclical
  - Instant feedback after each choice
- **Concepts**: Data visualization analysis, trend identification
- **Score**: 100 points per correct answer (max 500)

### Level 3: Bias Breakdown ⚖️
- **Theme**: Purple gradient
- **Duration**: 3-4 minutes
- **Gameplay**: 4 ethical decision scenarios
  - Each choice affects 3 metrics: Accuracy, Bias, Trust
  - Real-time metric updates
  - Visual trust bar
- **Concepts**: AI ethics, fairness, balancing trade-offs
- **Score**: Average of (Accuracy + (100-Bias) + Trust)

---

## 🛠️ Technical Implementation

### Architecture
- **Modular Design**: Each level is completely independent
- **No Dependencies**: Pure HTML, CSS, JavaScript (no frameworks)
- **State Management**: localStorage for score persistence
- **Navigation**: Simple `window.location.href` for level transitions

### Key Features
1. **Score Persistence**
   - Saves best score per level
   - Displays on main menu
   - Calculates overall rank

2. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly buttons
   - Canvas resizing for Level 2

3. **Smooth Animations**
   - Screen transitions
   - Metric updates
   - Feedback effects

4. **Educational Tips**
   - Contextual feedback
   - Learning outcomes per level

---

## 🚀 How to Run

### Option 1: Local Testing
1. Open `index.html` in a modern browser (Chrome, Firefox, Edge)
2. Or use VS Code "Live Server" extension for auto-refresh

### Option 2: Deploy to Web
**GitHub Pages:**
```bash
# In your repo settings → Pages → Deploy from main branch
git add .
git commit -m "Initial commit"
git push origin main
```

**Netlify/Vercel:**
- Drag and drop the entire folder to their dashboard
- Or connect your GitHub repo for automatic deployment

---

## 🧪 Testing Checklist

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Open main menu | Shows 3 level cards with "--" scores | ✅ |
| Click Level 1 | Opens Model Mayhem game | ✅ |
| Complete Level 1 | Saves score → returns to menu | ✅ |
| Click Level 2 | Opens Data Detective (orange theme) | ✅ |
| Play 5 rounds | Canvas charts appear, choices work | ✅ |
| Complete Level 2 | Score saved (max 500) | ✅ |
| Click Level 3 | Opens Bias Breakdown (purple theme) | ✅ |
| Make 4 choices | Metrics update in real-time | ✅ |
| Complete Level 3 | Final score calculated and saved | ✅ |
| Refresh menu | All saved scores visible | ✅ |
| Check total score | Sum of all level scores | ✅ |
| Test on mobile | Responsive, touch-friendly | ✅ |
| Reset progress | All scores cleared | ✅ |

---

## 📊 Score System

### Level 1 (Model Mayhem)
```javascript
finalScore = gameScore + 
             (accuracy × 1.5) + 
             (100 - bias) + 
             cleaningScore + 
             trainingQuality
```
**Range**: 0-500+

### Level 2 (Data Detective)
```javascript
finalScore = correctAnswers × 100
```
**Range**: 0-500

### Level 3 (Bias Breakdown)
```javascript
finalScore = (accuracy + (100 - bias) + trust) / 3
```
**Range**: 0-100

### Overall Rank
| Total Score | Rank |
|-------------|------|
| 1200+ | Legend |
| 1000-1199 | Master |
| 700-999 | Expert |
| 400-699 | Advanced |
| 1-399 | Novice |
| 0 | Beginner |

---

## 💡 Future Enhancements

### Phase 1: Polish
- [ ] Add background music (`assets/sounds/`)
- [ ] Sound effects for buttons and feedback
- [ ] Loading animations between levels
- [ ] Dark mode toggle

### Phase 2: Features
- [ ] Sequential level unlocking (complete Level 1 to unlock Level 2)
- [ ] Achievements system
- [ ] Leaderboard (local or online)
- [ ] Social sharing (Twitter/LinkedIn)

### Phase 3: PWA
- [ ] Create `manifest.json`
- [ ] Add service worker (`sw.js`)
- [ ] Make installable on mobile devices
- [ ] Offline support

### Phase 4: Expansion
- [ ] Level 4: Neural Network Builder
- [ ] Level 5: Data Privacy Simulator
- [ ] Time trial mode
- [ ] Multiplayer challenges

---

## 🎨 Design System

### Color Palette
```css
Main Menu: Purple gradient (#667eea → #764ba2)
Level 1:   Blue gradient (#4facfe → #00f2fe)
Level 2:   Orange gradient (#ff8c42 → #ff5722)
Level 3:   Purple gradient (#9b59b6 → #6c5ce7)
```

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 600, 700, 900

### Spacing
- Mobile: 16-24px padding
- Desktop: 24-40px padding
- Gap between elements: 12-32px

---

## 🐛 Known Issues

None currently! 🎉

---

## 📝 License

This project is open source and available for educational purposes.
Feel free to fork, modify, and learn from it!

---

## 👤 Author

Built with ❤️ by a data science enthusiast

**Contact**: [Add your contact info here]

---

## 🙏 Credits

- Font: [Poppins by Google Fonts](https://fonts.google.com/specimen/Poppins)
- Emojis: Standard Unicode
- Inspiration: Real-world data science challenges

---

## 📖 Learning Resources

Want to learn more about the concepts in this game?

- **ML Pipeline**: [Scikit-learn Pipeline Documentation](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html)
- **Data Bias**: [Google's ML Fairness Course](https://developers.google.com/machine-learning/crash-course/fairness/video-lecture)
- **Pattern Recognition**: [Introduction to Statistical Learning](https://www.statlearning.com/)
- **AI Ethics**: [Ethics of AI by MIT](https://ethics-of-ai.mooc.fi/)

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: Production Ready ✅
