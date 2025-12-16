# 🛸 AstroScope - Monorepo

AstroScope is an AI-powered space exploration platform that combines NASA's vast astronomical data with advanced AI to provide an engaging and educational journey through space.

## 📦 Project Structure

This is a monorepo containing both the mobile app and web application:

```
astroscope/
├── packages/
│   ├── mobile/          # React Native mobile app (iOS & Android)
│   └── web/             # Next.js web application
└── README.md
```

## 🚀 Projects

### Mobile App (`packages/mobile`)

A React Native mobile application featuring:
- **AI-Powered Chat**: Conversational interface powered by Google's Gemini AI
- **NASA Mission Intelligence**: Access to thousands of NASA lessons learned
- **Interactive Lessons**: Educational content about space missions
- **Real-time Data**: Integration with multiple NASA APIs

**Tech Stack**: React Native, Expo, TypeScript, Google Gemini API

[View Mobile README](./packages/mobile/README.md)

### Web Application (`packages/web`)

A Next.js web application serving as the landing page and web version:
- **Astronomy Picture of the Day**: Daily featured NASA imagery
- **Responsive Design**: Glassmorphism UI matching the mobile app theme
- **Marketing Site**: Information about the mobile app features
- **Download Links**: Direct links to app stores

**Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, NASA APOD API

[View Web README](./packages/web/README.md)

## 🎨 Design System

Both applications share a consistent dark space-tech theme:

- **Background**: `#0A0E27` (Deep space blue)
- **Primary Accent**: `#00D9FF` (Cyan)
- **Secondary Accent**: `#9D4EDD` (Purple)
- **Glass Effects**: Glassmorphism with `rgba(255, 255, 255, 0.05)`

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- For mobile: Expo CLI
- For web: Next.js

### Getting Started

#### Mobile App
```bash
cd packages/mobile
npm install
npm start
```

#### Web App
```bash
cd packages/web
npm install
npm run dev
```

## 📝 Environment Variables

Each package requires its own `.env` file. See individual README files for details:
- [Mobile .env setup](./packages/mobile/.env.example)
- [Web .env setup](./packages/web/.env.example)

## 🤝 Contributing

This project was built for PlanetX Hackathon. Contributions are welcome!

## 📄 License

MIT License - see individual package LICENSE files for details.

## 🔗 Links

- **GitHub**: [saifmb0/astroscope](https://github.com/saifmb0/astroscope)
- **Mobile Repo (Legacy)**: [saifmb0/planetx](https://github.com/saifmb0/planetx)
- **Web Repo (Legacy)**: [saifmb0/astroScopeWeb](https://github.com/saifmb0/astroScopeWeb)
