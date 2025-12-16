# AstroScope - Space Decoded

A cutting-edge Next.js web platform showcasing AI-powered space mission insights, presented at Dubai Air Show 2025.

## 🚀 Features

- **Landing Page**: Marketing-focused page with hero section, features grid, and tech stack showcase
- **Mission Control**: Interactive RAG (Retrieval-Augmented Generation) chatbot demo
- **Real-time Processing**: Visual step-by-step display of the RAG pipeline
- **Resilient Architecture**: Seamless fallback to mock data if APIs fail
- **Glassmorphism UI**: Deep space-themed design with animated starfield background

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **APIs**: NASA LLIS, Gemini AI
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
webpage/
├── app/
│   ├── layout.tsx              # Global layout with Navbar & StarField
│   ├── page.tsx                # Landing page
│   ├── mission-control/
│   │   └── page.tsx            # RAG Chatbot interface
│   └── globals.css             # Global styles
├── components/
│   ├── StarField.tsx           # Animated particle background
│   ├── Navbar.tsx              # Navigation with active state
│   ├── GlassCard.tsx           # Glassmorphism card component
│   ├── Button.tsx              # Reusable button with variants
│   └── ProcessLog.tsx          # Terminal-style process logger
├── lib/
│   ├── nasa-api.ts             # NASA API integration + mock data
│   └── gemini-api.ts           # Gemini AI integration + fallback
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Colors
- **Background**: `#0A0E27` (Space Dark)
- **Primary Accent**: `#00D9FF` (Cyan)
- **Secondary Accent**: `#9D4EDD` (Purple)

### Components
- All UI elements use `backdrop-blur-xl` for glassmorphism
- Thin white borders (`border-white/10`)
- Gradient text effects for headings

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

### 3. Build for Production

```bash
npm run build
npm start
```

## 🎮 Mission Control Features

### RAG Process Visualization

1. **Uplink Established**: Connection animation
2. **Querying NASA LLIS**: Shows raw JSON query
3. **Analyzing Telemetry**: Gemini AI processing
4. **Response Streaming**: Real-time text generation
5. **Citations Display**: Clickable NASA lesson references

### Mock Data Toggle

The Mission Control page includes a toggle to switch between:
- **Mock Data**: Always works, perfect for demos
- **Live NASA API**: Attempts real API calls with automatic fallback

### Suggested Queries

- "What is the status of Artemis II?"
- "Tell me about Mars Perseverance rover"
- "How does the ISS life support system work?"
- "What are the challenges of deep space missions?"

## 🔑 API Configuration (Optional)

To use live Gemini AI (instead of mock responses):

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to your environment:

```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

3. Update `app/mission-control/page.tsx` to use the API key:

```typescript
const geminiResponse = await queryGeminiWithContext(
  queryText, 
  context, 
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);
```

## 📦 Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with CTAs
- Features grid (4 key capabilities)
- Tech stack showcase
- Footer with Dubai Air Show branding

### Mission Control (`/mission-control`)
- Command-line style input
- Process log visualization
- AI response streaming
- Source citations with NASA lesson IDs

## 🎭 Demo Tips

1. **Use Mock Data**: Enable mock data toggle for reliable demos
2. **Pre-load Queries**: Use suggested queries for quick demonstrations
3. **Show Process Log**: Highlight the RAG pipeline visualization
4. **Explain Citations**: Point out how answers are backed by real NASA data

## 📱 Mobile App Links

Update the iOS download link in:
- `app/page.tsx` (Landing page CTAs)

Replace `https://apps.apple.com` with your actual App Store URL.

## 🐛 Troubleshooting

### TypeScript Errors
These are expected before running `npm install`. Once dependencies are installed, all errors will resolve.

### CORS Issues with NASA API
The app automatically falls back to mock data if NASA LLIS API blocks requests. This ensures the demo never fails.

### Starfield Not Animating
Check browser console for errors. The StarField component requires client-side rendering.

## 📄 License

Built for Dubai Air Show 2025 presentation.

## 🌟 Credits

- **NASA Open Data**: Mission data and lessons learned
- **Google Gemini**: AI language models
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS framework

---

**Presented at Dubai Air Show 2025** 🚁✈️
