# AstroScope Monorepo Structure

## Overview
This repository has been restructured as a monorepo containing both the mobile and web applications.

## Repository Information
- **GitHub URL**: https://github.com/saifmb0/astroscope
- **Main Branch**: `main` (also available on `master` for backward compatibility)
- **Structure**: Monorepo with workspaces

## Directory Structure
```
astroscope/
├── README.md                 # Main project documentation
├── package.json             # Root package.json with workspaces
├── .gitignore              # Root-level gitignore
└── packages/
    ├── mobile/             # React Native mobile app
    │   ├── App.tsx
    │   ├── package.json
    │   ├── screens/
    │   ├── services/
    │   └── ...
    └── web/                # Next.js web application
        ├── app/
        ├── components/
        ├── package.json
        └── ...
```

## Git History
- ✅ All previous commits preserved
- ✅ No git history rewritten
- ✅ Changes merged from original remote repository
- ✅ Clean monorepo structure established

## Commands

### Install dependencies for all packages
```bash
npm run install:all
```

### Run mobile app
```bash
npm run mobile
# or
cd packages/mobile && npm start
```

### Run web app
```bash
npm run web
# or
cd packages/web && npm run dev
```

## Migration Notes

### Previous Repositories
- Mobile (Legacy): https://github.com/saifmb0/planetx
- Web (Legacy): https://github.com/saifmb0/astroScopeWeb

These repositories can be archived as the code now lives in the unified monorepo.

### Changes Made
1. Created monorepo structure with `packages/` directory
2. Moved mobile app to `packages/mobile`
3. Moved web app to `packages/web`
4. Created root-level configuration files
5. Merged with existing remote repository
6. Cleaned up duplicate files
7. Pushed to both `main` and `master` branches

## Working with the Monorepo

### Clone the repository
```bash
git clone https://github.com/saifmb0/astroscope.git
cd astroscope
```

### Set up development environment
```bash
# Install dependencies for all packages
npm run install:all

# Set up environment variables
cp packages/mobile/.env.example packages/mobile/.env
cp packages/web/.env.example packages/web/.env
# Edit .env files with your API keys
```

### Development workflow
```bash
# Terminal 1: Run mobile app
npm run mobile

# Terminal 2: Run web app
npm run web
```

## Deployment

### Mobile App
Handled through Expo EAS:
```bash
cd packages/mobile
npm run build
```

### Web App
Deployed on Vercel:
```bash
cd packages/web
npm run build
```

## Contributing
All development now happens in this unified repository. Create feature branches from `main` and submit pull requests.
