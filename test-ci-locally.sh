#!/bin/bash
# Local CI test runner - Run this before pushing to verify CI will pass

set -e

echo "🚀 Running local CI tests..."
echo ""

# Test Mobile App
echo "📱 Testing Mobile App"
echo "===================="
cd packages/mobile

echo "📦 Installing dependencies..."
npm ci > /dev/null 2>&1
echo "✅ Dependencies installed"

echo "🔍 Running TypeScript check..."
npx tsc --noEmit
echo "✅ TypeScript check passed"

echo "✓ Verifying package.json..."
node -e "require('./package.json')"
echo "✅ Package.json is valid"

echo "✓ Verifying entry point..."
if [ -f "index.ts" ]; then
  echo "✅ Entry point (index.ts) exists"
else
  echo "❌ Entry point (index.ts) missing"
  exit 1
fi

echo "✓ Verifying App.tsx..."
if [ -f "App.tsx" ]; then
  echo "✅ App.tsx exists"
else
  echo "❌ App.tsx missing"
  exit 1
fi

echo "✓ Verifying Expo config..."
if [ -f "app.json" ]; then
  echo "✅ Expo app.json exists"
else
  echo "❌ Expo app.json missing"
  exit 1
fi

cd ../..

echo ""
echo "🌐 Testing Web App"
echo "=================="
cd packages/web

echo "📦 Installing dependencies..."
npm ci > /dev/null 2>&1
echo "✅ Dependencies installed"

echo "🔍 Running TypeScript check..."
npx tsc --noEmit
echo "✅ TypeScript check passed"

echo "🏗️ Building web app..."
npm run build > /dev/null 2>&1
echo "✅ Build completed"

echo "✓ Verifying build output..."
if [ -d ".next" ]; then
  echo "✅ Next.js build output exists"
else
  echo "❌ Next.js build failed"
  exit 1
fi

cd ../..

echo ""
echo "🏛️ Validating Monorepo Structure"
echo "================================"

echo "✓ Checking root package.json..."
if [ -f "package.json" ]; then
  echo "✅ Root package.json exists"
else
  echo "❌ Root package.json missing"
  exit 1
fi

echo "✓ Checking packages directory..."
if [ -d "packages" ]; then
  echo "✅ packages/ directory exists"
else
  echo "❌ packages/ directory missing"
  exit 1
fi

echo "✓ Verifying package names..."
mobile_name=$(node -pe "require('./packages/mobile/package.json').name")
web_name=$(node -pe "require('./packages/web/package.json').name")

if [ "$mobile_name" = "$web_name" ]; then
  echo "❌ Package names conflict: $mobile_name"
  exit 1
else
  echo "✅ Package names are unique:"
  echo "   Mobile: $mobile_name"
  echo "   Web: $web_name"
fi

echo ""
echo "✅ ================================"
echo "✅ All CI tests passed locally!"
echo "✅ ================================"
echo ""
echo "You can now push to GitHub with confidence 🚀"
