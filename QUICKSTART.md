# 🚀 QUICK START - Data Quest

**Get your game running in 60 seconds!**

---

## ▶️ Method 1: Instant Play (Simplest)

```
1. Navigate to: data-science-games-v2 folder
2. Double-click: index.html
3. ✅ Game opens in browser!
```

---

## 🔥 Method 2: Live Development (Recommended)

**Using VS Code:**
```
1. Open folder in VS Code
2. Install "Live Server" extension
3. Right-click index.html → "Open with Live Server"
4. ✅ Auto-refreshes on every save!
```

---

## 🎮 Test Your Game

### Quick Test Flow:
```
1. Main Menu → See 3 level cards ✅
2. Click Level 1 → Play Model Mayhem ✅
3. Complete level → Score saves ✅
4. Back to Menu → Score appears ✅
5. Click Level 2 → Play Data Detective ✅
6. Click Level 3 → Play Bias Breakdown ✅
7. Check Total Score → Updates correctly ✅
```

---

## 📂 Project Structure

```
data-science-games-v2/
├── index.html           ← START HERE
├── styles.css
├── script.js
├── level1/              ← Model Mayhem
├── level2/              ← Data Detective
├── level3/              ← Bias Breakdown
├── assets/              ← Future media files
├── README.md            ← Full documentation
├── DEVELOPER-GUIDE.md   ← Dev instructions
├── FLOW-DIAGRAM.md      ← Architecture
└── PROJECT-SUMMARY.md   ← What was built
```

---

## 🎯 What Each Level Does

### Level 1: Model Mayhem 🤖
- **5 stages** of ML pipeline
- **Blue theme**
- **4-5 min** gameplay

### Level 2: Data Detective 🔍
- **5 rounds** pattern recognition
- **Orange theme**, Canvas charts
- **3 min** gameplay

### Level 3: Bias Breakdown ⚖️
- **4 scenarios** ethical decisions
- **Purple theme**, Metrics system
- **3-4 min** gameplay

---

## 💾 Score System

Scores automatically save to browser's localStorage:
- `level1Score` → Best score from Level 1
- `level2Score` → Best score from Level 2
- `level3Score` → Best score from Level 3

**Total Score** = Sum of all three  
**Rank** = Calculated from total (Beginner → Legend)

---

## 🐛 Quick Debug

**Scores not saving?**
```javascript
// Open browser console (F12)
localStorage.getItem('level1Score')
```

**Canvas not showing? (Level 2)**
```javascript
// Check console for errors
console.log(canvas, ctx)
```

**Navigation broken?**
```
Check file paths are correct:
✅ ./level1/index.html (from root)
✅ ../index.html (from level)
```

---

## 🚢 Deploy in 5 Minutes

### GitHub Pages:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO
git push -u origin main

# In GitHub: Settings → Pages → Deploy from main
```

### Netlify:
```
1. Go to netlify.com
2. Drag folder to dashboard
3. ✅ Get instant URL!
```

---

## 📖 Need More Info?

| File | Purpose |
|------|---------|
| `README.md` | Complete overview & features |
| `DEVELOPER-GUIDE.md` | Detailed dev instructions |
| `FLOW-DIAGRAM.md` | Visual architecture |
| `PROJECT-SUMMARY.md` | What was built |

---

## ⚡ Common First Tasks

### Change Colors:
Edit `styles.css` (root directory):
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add Sound:
```javascript
const clickSound = new Audio('./assets/sounds/click.mp3');
button.addEventListener('click', () => {
    clickSound.play();
});
```

### Modify Scoring:
Edit `level1/script.js` (or level2/level3):
```javascript
const finalScore = Math.round(
    gameState.score +     // ← Change formula
    gameState.accuracy * 1.5
);
```

---

## ✅ Everything Works!

- ✅ Main menu launcher
- ✅ 3 complete levels
- ✅ Score persistence
- ✅ Navigation system
- ✅ Responsive design
- ✅ Cross-browser ready
- ✅ Fully documented

---

## 🎉 You're Ready!

1. Open `index.html`
2. Play the game
3. Deploy to web (optional)
4. Share with the world!

---

**🎮 Enjoy your Data Quest! 🚀**

---

*For detailed instructions, see: `DEVELOPER-GUIDE.md`*  
*For architecture details, see: `FLOW-DIAGRAM.md`*  
*For complete overview, see: `README.md`*
