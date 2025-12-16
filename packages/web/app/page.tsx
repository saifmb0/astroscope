import React from 'react';
import Button from '@/components/Button';
import { Telescope, Rocket, Bot, BookOpen, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20 overflow-y-auto">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12">
          {/* Dubai Air Show Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
              </span>
              <span className="text-sm text-white/90 font-medium">Showcasing at Dubai Air Show</span>
            </div>
          </div>

          {/* Visual Icon with Gradient */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#00D9FF]/30 rotate-3">
              <Telescope className="w-14 h-14 text-white -rotate-3" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-7xl font-bold mb-4 text-gradient">
            AstroScope
          </h1>
          
          <p className="text-3xl mb-3 text-white/90 font-semibold">
            Space Decoded.
          </p>
          
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Unlock the universe of NASA missions with AI. Ask questions, explore mission data, 
            and access decades of space exploration insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button href="https://drive.google.com/file/d/1qrLBwNtPpWMH098ZG16gX5ehwd8t85sY/view?usp=drive_link" external variant="primary" className="text-lg px-8 py-4">
              📱 Download on Android
            </Button>
            <Button href="/mission-control" variant="secondary" className="text-lg px-8 py-4">
              🎮 Launch Mission Control
            </Button>
          </div>

          {/* Social Proof Stats */}
          <div className="flex gap-12 justify-center">
            <div>
              <div className="text-4xl font-bold text-[#00D9FF] mb-1">10K+</div>
              <div className="text-sm text-gray-400">Mission Records</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00D9FF] mb-1">50+</div>
              <div className="text-sm text-gray-400">Active Missions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00D9FF] mb-1">24/7</div>
              <div className="text-sm text-gray-400">Live Updates</div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/70">
              Powered by <span className="text-[#00D9FF] font-semibold">NASA Open Data</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/70">
              AI by <span className="text-[#9D4EDD] font-semibold">Google Gemini</span>
            </div>
          </div>
        </div>

        {/* Mission Capabilities Section */}
        <div className="max-w-6xl mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gradient mb-4">Mission Capabilities</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Live Mission Data */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-xl flex items-center justify-center shadow-lg shadow-[#00D9FF]/30 group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Live Mission Data</h3>
              <p className="text-white/70 leading-relaxed">
                Real-time updates from NASA's active missions including Artemis, ISS, and Mars rovers.
              </p>
            </div>

            {/* AI-Powered Analysis */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-xl flex items-center justify-center shadow-lg shadow-[#9D4EDD]/30 group-hover:scale-110 transition-transform">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">AI-Powered Analysis</h3>
              <p className="text-white/70 leading-relaxed">
                Ask questions about any space mission and get intelligent answers powered by Gemini AI.
              </p>
            </div>

            {/* Lesson Repository */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-xl flex items-center justify-center shadow-lg shadow-[#00D9FF]/30 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Lesson Repository</h3>
              <p className="text-white/70 leading-relaxed">
                Access NASA's complete archive of mission lessons learned and engineering insights.
              </p>
            </div>

            {/* Interactive Visualizations */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-xl flex items-center justify-center shadow-lg shadow-[#9D4EDD]/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Interactive Visualizations</h3>
              <p className="text-white/70 leading-relaxed">
                Explore space data through stunning 3D models and real-time mission tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="max-w-6xl mx-auto py-24">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gradient mb-4">Powered By The Best</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Built on cutting-edge technology and fueled by authentic NASA data and Google Gemini AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* NASA LLIS */}
            <div className="glass-effect p-6 rounded-xl border border-white/10 text-center hover:border-[#00D9FF]/50 transition-all">
              <div className="text-4xl mb-3">🛰️</div>
              <h4 className="text-lg font-bold text-white mb-2">NASA LLIS</h4>
              <p className="text-sm text-white/60">Lessons Learned Information System</p>
            </div>

            {/* NASA API */}
            <div className="glass-effect p-6 rounded-xl border border-white/10 text-center hover:border-[#00D9FF]/50 transition-all">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="text-lg font-bold text-white mb-2">NASA API</h4>
              <p className="text-sm text-white/60">Open Data & Mission Archives</p>
            </div>

            {/* Gemini AI */}
            <div className="glass-effect p-6 rounded-xl border border-white/10 text-center hover:border-[#9D4EDD]/50 transition-all">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="text-lg font-bold text-white mb-2">Gemini AI</h4>
              <p className="text-sm text-white/60">Advanced Language Models</p>
            </div>

            {/* React Native */}
            <div className="glass-effect p-6 rounded-xl border border-white/10 text-center hover:border-[#00D9FF]/50 transition-all">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="text-lg font-bold text-white mb-2">React Native</h4>
              <p className="text-sm text-white/60">Cross-Platform Mobile</p>
            </div>
          </div>

          {/* NASA × Gemini Banner */}
          <div className="glass-effect p-8 rounded-2xl border border-white/10 text-center bg-gradient-to-r from-[#00D9FF]/10 to-[#9D4EDD]/10">
            <h3 className="text-2xl font-bold text-white mb-3">NASA Open Data × Gemini AI</h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real mission telemetry meets advanced language models for unprecedented space exploration insights
            </p>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-4xl mx-auto py-24 text-center">
          <h2 className="text-6xl font-bold text-gradient mb-6">Ready for Launch?</h2>
          <p className="text-2xl text-white/80 mb-12">
            Experience the future of space exploration today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button href="https://apps.apple.com" external variant="primary" className="text-xl px-10 py-5">
              📱 Download Mobile App
            </Button>
            <Button href="/mission-control" variant="secondary" className="text-xl px-10 py-5">
              🎮 Try Web Demo
            </Button>
          </div>
        </div>

        {/* Footer Spacer */}
        <div className="py-12"></div>
      </div>
    </div>
  );
}
