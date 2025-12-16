# GitHub Actions Setup

This document explains how to configure GitHub Actions secrets for CI/CD.

## Required Secrets

### For Vercel Deployment (Optional)

If you want automatic deployment to Vercel, add these secrets to your GitHub repository:

1. **VERCEL_TOKEN**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   - Add it to GitHub: Repository → Settings → Secrets → Actions → New repository secret

2. **VERCEL_ORG_ID**
   - Found in Vercel project settings or `.vercel/project.json` after running `vercel link`
   - Add to GitHub secrets

3. **VERCEL_PROJECT_ID**
   - Found in Vercel project settings or `.vercel/project.json` after running `vercel link`
   - Add to GitHub secrets

4. **NASA_API_KEY** (Optional)
   - Get your NASA API key from [NASA API Portal](https://api.nasa.gov/)
   - Add to GitHub secrets
   - Default: Uses 'DEMO_KEY' if not provided

## Setup Steps

### 1. Add Secrets to GitHub

```bash
# Navigate to your repository on GitHub
# Go to: Settings → Secrets and variables → Actions
# Click: New repository secret
```

Add each secret with the appropriate value.

### 2. Link Vercel Project (Optional)

If you haven't already linked your Vercel project:

```bash
cd packages/web
npm install -g vercel
vercel link
```

This creates `.vercel/project.json` with your `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.

### 3. Configure Vercel for Monorepo

In your Vercel project settings:
- **Root Directory**: Leave as `/` (monorepo root)
- **Build Command**: Automatically detected from `vercel.json`
- **Output Directory**: Automatically detected from `vercel.json`

## CI/CD Workflow

The workflow automatically:

1. **On Pull Request or Push to main/master:**
   - ✅ Validates monorepo structure
   - ✅ Tests mobile app (TypeScript check)
   - ✅ Tests web app (Build + TypeScript check)
   - ✅ Verifies package names are unique

2. **On Push to main/master (only):**
   - 🚀 Deploys web app to Vercel (if secrets are configured)

## Workflow Status

Check your workflow status:
- Go to: Repository → Actions
- View build logs and test results

## Disabling Vercel Deployment

If you don't want automatic Vercel deployment, the workflow will skip the deploy step when secrets are not configured. The other checks will still run.

## Manual Deployment

You can always deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from web package
cd packages/web
vercel --prod
```

## Testing Locally

Test the CI/CD checks locally before pushing:

```bash
# Test mobile package
cd packages/mobile
npx tsc --noEmit

# Test web package
cd packages/web
npm run lint
npm run build
```
