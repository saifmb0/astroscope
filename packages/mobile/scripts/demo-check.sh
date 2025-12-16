#!/bin/bash

# AstroScope Demo Preparation Script
# Run this before your demo to ensure everything is ready

echo "🛸 AstroScope - Demo Preparation Check"
echo "====================================="
echo ""

# Check 1: Node modules
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "  ✅ Dependencies installed"
else
  echo "  ❌ Dependencies missing - run: npm install"
  exit 1
fi

# Check 2: Environment file
echo "✓ Checking environment configuration..."
if [ -f ".env" ]; then
  if grep -q "GEMINI_API_KEY=.*[^=]" .env; then
    echo "  ✅ Gemini API key configured"
  else
    echo "  ⚠️  WARNING: Gemini API key appears empty"
    echo "     Get key: https://makersuite.google.com/app/apikey"
    echo "     Edit .env and add your key"
  fi
else
  echo "  ❌ .env file missing"
  exit 1
fi

# Check 3: Seed data
echo "✓ Checking seed data..."
if [ -f "assets/data/lessons_seed.ts" ]; then
  LESSON_COUNT=$(grep -c "lesson_id:" assets/data/lessons_seed.ts)
  echo "  ✅ Seed database ready ($LESSON_COUNT lessons)"
else
  echo "  ❌ Seed data missing"
  exit 1
fi

# Check 4: Source files
echo "✓ Checking source files..."
FILES_OK=true

for file in "App.tsx" "screens/HomeScreen.tsx" "screens/ChatScreen.tsx" "screens/SettingsScreen.tsx" "services/NasaDataService.ts" "services/GeminiService.ts"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ Missing: $file"
    FILES_OK=false
  fi
done

if [ "$FILES_OK" = false ]; then
  exit 1
fi

echo ""
echo "====================================="
echo "🎯 Demo Readiness: READY"
echo "====================================="
echo ""
echo "To start the app:"
echo "  npm start"
echo ""
echo "Demo queries to try:"
echo "  • What are risks for asteroid lander?"
echo "  • Tell me about Apollo mission failures"
echo "  • Common thermal system issues"
echo "  • Cryogenic valve failures"
echo ""
echo "Quick demo flow:"
echo "  1. Home → Tap 'Cryogenic Valve Failures'"
echo "  2. Chat → AI responds with lessons"
echo "  3. Click Lesson ID → See details"
echo "  4. Ask follow-up question"
echo "  5. Settings → Show API status"
echo ""
echo "🚀 Good luck with your demo!"
