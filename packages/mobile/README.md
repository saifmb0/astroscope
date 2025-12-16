# 🛸 AstroScope - NASA Mission Intelligence

**Competition-ready MVP** built with React Native/Expo - An intelligent conversational interface for NASA's Lessons Learned Information System (LLIS).

![Status](https://img.shields.io/badge/Status-MVP-success)
![React Native](https://img.shields.io/badge/React_Native-Expo-blue)
![AI](https://img.shields.io/badge/AI-Gemini_2.0_Flash-orange)

---

## 🚀 Quick Start (3 Minutes to Launch)

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your mobile device (iOS/Android)
- Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# 1. Clone or navigate to project
cd Planetx

# 2. Install dependencies (if not already done)
npm install

# 3. Configure environment
# Copy .env.example to .env and add your Gemini API key
cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_actual_api_key_here

# 4. Start the app
npm start
```

### Running the App

After `npm start`, you'll see a QR code in the terminal:

- **iOS**: Scan with Camera app → Opens in Expo Go
- **Android**: Scan with Expo Go app
- **Web**: Press `w` in terminal

---

## 🎯 Key Features

### ✨ Core Functionality

1. **Hybrid Data Strategy (RAG Architecture)**
   - ✅ **Tier 1**: Local seed database with 12 high-quality NASA lessons (instant, offline-capable)
   - ✅ **Tier 2**: Live NASA LLIS API queries with 3-second timeout and automatic fallback
   
2. **Gemini 2.0 Flash AI Pipeline**
   - ✅ **Pipeline 1 (Sanitizer)**: Cleans raw NASA HTML data into structured JSON
   - ✅ **Pipeline 2 (Synthesizer)**: Answers questions with contextual NASA lesson data
   - ✅ Strict 5-second timeout with loading animations
   
3. **Premium Space Tech UI**
   - ✅ Dark mode with glassmorphism effects
   - ✅ Neon cyan/purple accent colors
   - ✅ Smooth animations and zero layout shift
   - ✅ Professional aerospace engineering aesthetic

### 📱 App Screens

#### 1. Home Screen
- Mission statistics dashboard
- Trending risk categories carousel (Apollo, Mars, Thermal, Communications, Propulsion, Cryogenic)
- Quick start card to AI chat
- Mission highlights with categorized lessons

#### 2. AI Chat Screen
- Conversational interface with Gemini AI
- Rich message bubbles with cited lesson IDs (clickable)
- Empty state with demo query suggestions
- Real-time loading indicators ("Analyzing deep space archives...")
- Full keyboard handling

#### 3. Settings Screen
- API configuration status
- Data source information
- About section with features list
- Resource links to NASA LLIS and Gemini AI

---

## 🏗️ Architecture

### Project Structure

```
Planetx/
├── App.tsx                          # Main navigation
├── screens/
│   ├── HomeScreen.tsx              # Dashboard with trending risks
│   ├── ChatScreen.tsx              # AI conversational interface
│   └── SettingsScreen.tsx          # Configuration
├── services/
│   ├── NasaDataService.ts          # Hybrid data strategy (local + live API)
│   └── GeminiService.ts            # AI pipelines (sanitizer + synthesizer)
├── components/
│   ├── GlassCard.tsx               # Glassmorphism card component
│   └── LoadingSpinner.tsx          # Premium loading animation
├── constants/
│   ├── theme.ts                    # Colors, typography, spacing
│   └── data.ts                     # Trending queries, demo prompts
├── types/
│   ├── nasa.ts                     # NASA lesson types
│   └── env.d.ts                    # Environment variable types
├── assets/
│   └── data/
│       └── lessons_seed.ts         # 12 curated NASA lessons (offline seed)
├── scripts/
│   └── fetchNasaData.js            # NASA data fetcher script
└── .env                            # API keys (YOU MUST CONFIGURE THIS)
```

### Technology Stack

- **Frontend**: React Native + Expo (TypeScript)
- **Navigation**: React Navigation (Bottom Tabs)
- **AI**: Google Gemini 2.0 Flash Experimental
- **Data**: NASA LLIS API + Local JSON seed
- **Styling**: Custom theme with glassmorphism
- **State**: React hooks (no external state management needed for MVP)

---

## 🔐 Critical Setup: API Configuration

### Gemini API Key (REQUIRED)

The app **will not work** without a Gemini API key. Here's how to set it up:

1. **Get your API key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Click "Create API Key"
   - Copy the key

2. **Configure .env file**:
   ```bash
   # Open .env file in the project root
   # Replace the placeholder with your actual key
   GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   NASA_LLIS_API_URL=https://llis.nasa.gov/llis/lesson/_search
   ```

3. **Verify configuration**:
   - Open the app
   - Go to Settings tab
   - Check if "Gemini API: ✅ Configured" appears
   - If you see "⚠️ Not configured", review your .env file

### Why Gemini 2.0 Flash?

- **Speed**: <1 second response times for MVP demos
- **Quality**: Excellent at data extraction and synthesis
- **Cost**: Free tier includes 1,500 requests/day
- **Reliability**: Stable API with good uptime

---

## 📊 Data Strategy Details

### Local Seed Database

**File**: `assets/data/lessons_seed.ts`

Contains 12 hand-curated NASA lessons:
- Apollo 13 oxygen tank explosion
- Mars Climate Orbiter unit conversion failure
- Space Shuttle Columbia thermal protection breach
- ISS ammonia coolant leak
- Hubble spherical aberration
- Curiosity sky crane landing
- Cryogenic propellant handling
- Deep Space Network communications
- James Webb sunshield deployment
- OSIRIS-REx thermal management
- Ingenuity Mars helicopter
- Artemis I hydrogen leak

**Why local seed?**
1. ✅ Instant demo capability (no network dependency)
2. ✅ Zero risk of NASA API failures during judging
3. ✅ Offline functionality
4. ✅ Guaranteed high-quality, relevant data

### Live NASA API

**Endpoint**: `https://llis.nasa.gov/llis/lesson/_search?query={term}`

- Attempted first for every search
- 3-second timeout (non-negotiable)
- Automatic fallback to local seed on failure/timeout
- Fetches up to 10 most relevant lessons

---

## 🎨 UI/UX Design Philosophy

### Premium Space Tech Aesthetic

**Color Palette**:
- Background: Deep space black (`#0A0E27`)
- Primary: Electric cyan (`#00D9FF`)
- Secondary: Cosmic purple (`#9D4EDD`)
- Accent: Neon green (`#06FFA5`)

**Design Principles**:
1. **Glassmorphism**: Translucent cards with backdrop blur effects
2. **Neon Accents**: Subtle glows on interactive elements
3. **Dark Mode First**: Optimized for low-light environments
4. **Zero Layout Shift**: All loading states maintain space
5. **Professional Typography**: Inter/System fonts with proper hierarchy

### Accessibility
- High contrast ratios (WCAG AA compliant)
- Large touch targets (44x44 minimum)
- Clear visual feedback for all interactions
- Readable font sizes (14px minimum)

---

## 🧪 Testing & Demo Preparation

### Pre-Demo Checklist

```bash
# 1. Verify environment
cat .env  # Check API key is present

# 2. Clear cache and rebuild
npm start -- --clear

# 3. Test demo queries in order:
```

**Recommended Demo Flow**:

1. **Open app** → Shows Home screen with trending risks
2. **Tap "Cryogenic Valve Failures"** → Triggers search in chat
3. **Wait for AI response** → Shows sanitized lessons + AI synthesis
4. **Click a cited Lesson ID** → Displays detailed lesson info
5. **Ask follow-up**: "What are the risks for an asteroid lander?"
6. **Show Settings** → Demonstrate API configuration status

### Expected Behavior

✅ **Good demo**:
- Home loads instantly with stats
- Chat responds within 2-5 seconds
- AI provides detailed, cited answers
- Lesson IDs are clickable and functional

❌ **Troubleshooting**:
- If AI doesn't respond: Check .env has valid Gemini API key
- If "No lessons found": Local seed will still provide data
- If layout breaks: Restart Expo with `npm start -- --clear`

---

## 🏆 Competition Strengths

### What Makes This MVP Stand Out

1. **No Fake Data**: Every lesson is real NASA LLIS content
2. **Production-Quality AI**: Gemini 2.0 Flash with proper error handling
3. **Hybrid Architecture**: Works online AND offline
4. **Premium UI**: Looks like a billion-dollar aerospace tool
5. **Fast Demo**: Optimized for 2-3 minute judging sessions
6. **Complete Features**: Not a prototype—it's a working product

### Technical Excellence

- ✅ TypeScript for type safety
- ✅ Proper error boundaries and fallbacks
- ✅ Timeout handling on all async operations
- ✅ Responsive design (works on all screen sizes)
- ✅ Efficient rendering (no unnecessary re-renders)
- ✅ Clean, documented code

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on specific platform
npm run android
npm run ios
npm run web

# Fetch fresh NASA data (optional - seed already provided)
node scripts/fetchNasaData.js

# Type checking
npx tsc --noEmit
```

---

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | - | Your Google Gemini API key |
| `NASA_LLIS_API_URL` | ❌ No | `https://llis.nasa.gov/llis/lesson/_search` | NASA LLIS endpoint |

---

## 🐛 Known Limitations (MVP Scope)

1. **NASA API Response**: The live NASA API may return limited data due to their API structure. The local seed provides guaranteed quality data.
2. **Gemini Rate Limits**: Free tier has 1,500 requests/day. For production, upgrade to paid tier.
3. **Web Platform**: Optimized for mobile. Web version is functional but less polished.
4. **Lesson Detail View**: Currently shows inline. Could be enhanced with dedicated detail screen.

---

## 🚢 Deployment (Post-MVP)

### Option 1: Expo EAS (Recommended)
```bash
npm install -g eas-cli
eas build --platform all
eas submit
```

### Option 2: Standalone App
```bash
expo build:android
expo build:ios
```

---

## 📄 License

MIT License - Built for NASA Space Apps Challenge

---

## 🙏 Acknowledgments

- **NASA LLIS Team**: For maintaining the Lessons Learned database
- **Google AI**: For Gemini 2.0 Flash API
- **Expo Team**: For the amazing React Native framework
- **Space Community**: For inspiring safer space exploration

---

## 📞 Support

If you encounter issues:

1. Check `.env` configuration
2. Clear cache: `npm start -- --clear`
3. Verify Gemini API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
4. Check Settings screen for configuration status

---

## 🎯 Next Steps (Post-MVP Roadmap)

- [ ] Voice input for queries
- [ ] Lesson bookmarking
- [ ] Share lessons via social media
- [ ] PDF export of chat conversations
- [ ] Advanced filtering (by mission, date, center)
- [ ] Multi-language support
- [ ] Real-time collaboration features
- [ ] Integration with NASA Technical Reports Server

---

**Built with 🚀 by the AstroScope Team**

*Making space safer, one lesson at a time.*
