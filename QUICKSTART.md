# 🚀 AstroScope - Quick Start Guide

## ⚡ 3-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API Key
1. Get Gemini API key: https://makersuite.google.com/app/apikey
2. Open `.env` file
3. Replace `GEMINI_API_KEY=` with your actual key

### Step 3: Start the App
```bash
npm start
```

Then scan the QR code with:
- **iOS**: Camera app
- **Android**: Expo Go app

## 📱 First Demo

1. App opens to Home screen with trending risks
2. Tap "Cryogenic Valve Failures" → Goes to chat
3. AI responds with lessons from NASA database
4. Click a "Lesson ID" link to see details
5. Ask: "What are risks for asteroid lander?"

## 🔧 Troubleshooting

**No AI response?**
- Check `.env` has your Gemini API key
- Go to Settings tab → Should show "✅ Configured"

**App won't start?**
```bash
npm start -- --clear
```

## ✨ Features to Demo

✅ Hybrid data (works offline with local seed)  
✅ AI-powered insights with Gemini 2.0 Flash  
✅ Premium dark mode UI with glassmorphism  
✅ Clickable lesson citations  
✅ Real NASA mission data  

---

**Built for NASA Space Apps Challenge 2025**
